import { useSelectedRow } from '../context/selected-row-provider';
import CreateDialog from './create/CreateDialog';
import DeleteDialog from './delete/DeleteDialog';
import UpdateDialog from './update/UpdateDialog';

const DialogContainer = () => {
  const { openDialog } = useSelectedRow();
  if (openDialog === 'add') return <CreateDialog />;
  if (openDialog === 'delete') return <DeleteDialog />;
  if (openDialog === 'edit') return <UpdateDialog />;
};

export default DialogContainer;
