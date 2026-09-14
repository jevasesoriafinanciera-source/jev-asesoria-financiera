import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App if not already initialized
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Provider with required Google Calendar scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar');
provider.addScope('https://www.googleapis.com/auth/calendar.events');

// In-memory access token cache
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso para Google Calendar.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Error durante autenticación Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface CalendarEventPayload {
  summary: string;
  description: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  attendeeEmail?: string;
  attendeeName?: string;
}

export interface CreatedCalendarEvent {
  id: string;
  htmlLink: string;
  meetLink?: string;
  summary: string;
}

export const createCalendarEvent = async (
  payload: CalendarEventPayload,
  token?: string
): Promise<CreatedCalendarEvent> => {
  const accessToken = token || cachedAccessToken;
  if (!accessToken) {
    throw new Error('Se requiere autenticación con Google Calendar para crear el evento.');
  }

  const attendees = [];
  if (payload.attendeeEmail) {
    attendees.push({
      email: payload.attendeeEmail,
      displayName: payload.attendeeName || undefined,
    });
  }

  // Include institutional advisor email
  attendees.push({
    email: 'clientes@jevasesoriafinanciera.com',
    displayName: 'JEV Asesoría Financiera',
  });

  const eventBody = {
    summary: payload.summary,
    description: payload.description,
    start: {
      dateTime: payload.startTime,
      timeZone: 'America/Bogota',
    },
    end: {
      dateTime: payload.endTime,
      timeZone: 'America/Bogota',
    },
    attendees,
    conferenceData: {
      createRequest: {
        requestId: `jev-meet-${Date.now()}`,
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventBody),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Google Calendar API Error:', errorData);
    throw new Error(
      errorData?.error?.message ||
        `Error ${response.status} al programar en Google Calendar.`
    );
  }

  const data = await response.json();
  const meetUri =
    data.conferenceData?.entryPoints?.find(
      (ep: { entryPointType: string; uri: string }) => ep.entryPointType === 'video'
    )?.uri || data.hangoutLink;

  return {
    id: data.id,
    htmlLink: data.htmlLink,
    meetLink: meetUri,
    summary: data.summary,
  };
};

/**
 * Fallback / instant calendar template link generator (opens in Google Calendar)
 */
export const buildGoogleCalendarWebLink = (
  title: string,
  details: string,
  startTime: string,
  endTime: string
): string => {
  const formatTime = (iso: string) =>
    new Date(iso).toISOString().replace(/-|:|\.\d\d\d/g, '');

  const startFormatted = formatTime(startTime);
  const endFormatted = formatTime(endTime);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: details,
    dates: `${startFormatted}/${endFormatted}`,
    add: 'clientes@jevasesoriafinanciera.com',
    location: 'Google Meet (Sesión Virtual)',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
