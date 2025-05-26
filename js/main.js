document.addEventListener('DOMContentLoaded', function () {
  fetch('events.json')
    .then(response => response.json())
    .then(events => {
      const categoryColors = {
        maintenance: '#ffcd00',
        config_change: '#4f3276',
        observation: '#99cc99',
        alert: '#ff6666'
      };

      const coloredEvents = events.map(event => ({
        ...event,
        color: categoryColors[event.category] || '#cccccc'
      }));

      const calendarEl = document.getElementById('calendar');
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: coloredEvents
      });

      calendar.render();
      window.calendar = calendar; // 💡 Store globally so the form can access it
    });
});

document.getElementById('event-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const newEvent = {
    id: 'evt-' + Date.now(),
    title: document.getElementById('title').value,
    start: document.getElementById('start').value,
    end: document.getElementById('end').value || undefined,
    category: document.getElementById('category').value,
    location: document.getElementById('location').value,
    components: document.getElementById('components').value.split(',').map(c => c.trim()).filter(c => c),
    notes: document.getElementById('notes').value,
    created_by: document.getElementById('created_by').value,
    last_updated: new Date().toISOString(),
    color: {
      maintenance: '#ffcd00',
      config_change: '#4f3276',
      observation: '#99cc99',
      alert: '#ff6666'
    }[document.getElementById('category').value] || '#cccccc'
  };

  if (window.calendar) {
    window.calendar.addEvent(newEvent);
    alert("✅ Event added locally (not saved to file)");
    e.target.reset();
  } else {
    alert("❌ Calendar not initialized");
  }
});

document.getElementById('export-btn').addEventListener('click', function () {
  if (!window.calendar) {
    alert("❌ Calendar not initialized");
    return;
  }

  const events = window.calendar.getEvents().map(e => {
    return {
      id: e.id,
      title: e.title,
      start: e.startStr,
      end: e.endStr || undefined,
      category: e.extendedProps.category,
      location: e.extendedProps.location,
      components: e.extendedProps.components || [],
      notes: e.extendedProps.notes || '',
      created_by: e.extendedProps.created_by,
      last_updated: e.extendedProps.last_updated
    };
  });

  const jsonStr = JSON.stringify(events, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = "events.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});
