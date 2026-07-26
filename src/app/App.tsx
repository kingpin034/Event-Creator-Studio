import { EventProvider } from "./components/event-context";
import { CreateEvent } from "./components/create-event";

export default function App() {
  return (
    <EventProvider>
      <CreateEvent />
    </EventProvider>
  );
}
