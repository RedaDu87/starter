import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: true,
    select: this.handleDateSelect.bind(this),
    events: [],
    eventClick: this.handleEventClick.bind(this),
    editable: true,
    eventDisplay: 'block',
  };

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Enter event title');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    const action = prompt(
      `Edit title or type DELETE to remove:\nCurrent: ${clickInfo.event.title}`
    );

    if (action === 'DELETE') {
      if (confirm('Are you sure you want to delete this event?')) {
        clickInfo.event.remove();
      }
    } else if (action) {
      clickInfo.event.setProp('title', action);
    }
  }
}
