const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyjraw3WRIAdbC7HQq6r5_t1VU5hmX1Ap9owWGZWZjDLRVfKY2iO4YsFbtqGCZtupL2Ow/exec';

export interface CalendarEventPayload {
  summary: string;
  description: string;
  startTime: string;
  endTime: string;
  attendeeEmail?: string;
  attendeeName?: string;
  area?: string;
  fullName?: string;
  company?: string;
  role?: string;
  phone?: string;
  meetingMode?: string;
  notes?: string;
}

export interface CreatedCalendarEvent {
  id: string;
  htmlLink: string;
  meetLink?: string;
  summary: string;
}

/**
 * Crea una cita en el Google Calendar de JEV
 * mediante Google Apps Script.
 *
 * El cliente NO necesita iniciar sesión con Google.
 */
export const createCalendarEvent = async (
  payload: CalendarEventPayload
): Promise<CreatedCalendarEvent> => {

  const response = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      title: payload.summary,
      fullName: payload.fullName || payload.attendeeName || '',
      company: payload.company || '',
      role: payload.role || '',
      email: payload.attendeeEmail || '',
      phone: payload.phone || '',
      area: payload.area || '',
      meetingMode: payload.meetingMode || 'Virtual (Google Meet)',
      notes: payload.notes || '',
      startTime: payload.startTime,
      endTime: payload.endTime,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Error ${response.status} al comunicarse con el sistema de agendamiento.`
    );
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(
      data.message || 'No fue posible crear la cita.'
    );
  }

  return {
    id: data.eventId,
    htmlLink: data.eventUrl,
    meetLink: data.meetLink || undefined,
    summary: data.eventTitle,
  };
};


/**
 * Genera un enlace alternativo para agregar
 * manualmente la cita a Google Calendar.
 */
export const buildGoogleCalendarWebLink = (
  title: string,
  details: string,
  startTime: string,
  endTime: string
): string => {

  const formatTime = (iso: string) =>
    new Date(iso)
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, '');

  const startFormatted = formatTime(startTime);
  const endFormatted = formatTime(endTime);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: details,
    dates: `${startFormatted}/${endFormatted}`,
    add: 'jevasesoriafinanciera@gmail.com',
    location: 'Google Meet - JEV Asesoría Financiera',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
