import BreadcrumbHeader from '@/pages/Header';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import UsersTable from './UsersTable';
import DialogContainer from './dialogs/DialogContainer';

const UsersIndex = () => {
  return (
    <div>
      <BreadcrumbHeader
        breadcrumbs={[
          { title: 'User', href: '/users' },
          { title: 'Profile', href: '/users/profile' },
        ]}
      />
      <div className=" w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>Manage your users and their roles here.</CardDescription>
            <CardAction>{/* <Button onClick={() => handleDialogChange('add')}>Add New User</Button> */}</CardAction>
          </CardHeader>
          <CardContent>
            <UsersTable />
            <DialogContainer />
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UsersIndex;
