import { KTCard } from "../../../../../_metronic/helpers";
import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { UsersTable } from "./table/UsersTable";
import { UserEditModal } from "./user-edit-modal/UserEditModal";

const UsersList = () => {
  const { itemIdForUpdate } = useListView();
  return (
    <>
      <KTCard>
        {/* <UsersListHeader /> */}
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <UserEditModal />}
    </>
  );
};

const UsersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
);

export { UsersListWrapper };
