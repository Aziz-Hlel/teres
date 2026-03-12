import { SelectedRowProvider } from './context/selected-row-provider';
import Main from './Main';

const EventsIndex = () => {
  return (
    <SelectedRowProvider>
      <Main />
    </SelectedRowProvider>
  );
};

export default EventsIndex;
