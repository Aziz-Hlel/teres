import { useSelectedRow } from '../context/selected-row-provider';
import Add from './Add';
import DeleteProduct from './Delete';
import Edit from './Edit';

const DialogContainer = () => {
  const { openDialog } = useSelectedRow();
  if (openDialog === 'add') return <Add />;
  if (openDialog === 'delete') return <DeleteProduct />;
  if (openDialog === 'edit') return <Edit />;
};

export default DialogContainer;
