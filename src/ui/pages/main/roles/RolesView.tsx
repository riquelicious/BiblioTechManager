// Material UI Components
import { Divider } from "@mui/material";
// Hooks
import useSearch from "../../hooks/useSearch";
import { useEffect, useContext, useLayoutEffect } from "react";
// Components
import SearchPanel from "../../components/SearchPanel";
import ViewTable from "../../components/Table/ViewTable";
import MainContainer from "../../components/MainContainer";
import TablePaginationBar from "../../components/Table/TablePaginationBar";
import TableHeader from "../../components/Table/TableHeader";
import columns from "../../components/Table/columns/role/view";
import { TableContext } from "../../context/TableContext";
import { TableSearchContext } from "../../context/TableSearchContext";
import RolesData from "../../components/Table/Roles/RolesData";
import { PermissionContext } from "../../context/PermissionContext";
import { getRoute, routes } from "../../Router";

const fetchData = async (payload: GetPagedPayload): Promise<any> => {
	return await window.requestRole.getPaged(payload);
};

const searchFilter: any[] = [
	{ filter: "Name", value: "role_name" },
	{ filter: "Notes", value: "notes" },
];

const URL = {
	update: getRoute(routes.ROLES.UPDATE),//"//roles/manage-roles/edit-existing-roles",
	delete: getRoute(routes.ROLES.DELETE)//"//roles/manage-roles/remove-roles",
};

function RolesView() {
	const { roles } = useContext(PermissionContext);
	/**
	 * Table
	 */
	const {
		rowData: { setRows },
		columnData: { setColumns },
	} = useContext(TableContext);
	/**
	 * Search
	 */
	const search = useSearch({
		fetchData,
		defaultFilter: "role_name",
		queryKey: "rolesView",
	});
	const { rowData, isLoading } = search;

	useLayoutEffect(() => {
		setRows(rowData);
		setColumns(columns);
	}, [rowData]);

	return (
		<TableSearchContext.Provider value={{ search, searchFilter, URL }}>
			<MainContainer>
				<SearchPanel />
				<Divider variant="middle" />
				<ViewTable isLoading={isLoading}>
					<TableHeader selectable />
					<RolesData selectable />
				</ViewTable>
				<Divider variant="middle" />
				<TablePaginationBar
					canDelete={roles?.delete}
					canUpdate={roles?.update}
				/>
			</MainContainer>
		</TableSearchContext.Provider>
	);
}

export default RolesView;
