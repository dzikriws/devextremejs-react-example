import React from "react";
import { DataGrid, Column } from 'devextreme-react/data-grid';
import notify from "devextreme/ui/notify";
import CustomStore from 'devextreme/data/custom_store';
import axios from "axios";
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';

const API_URL = 'http://localhost:3000/company-employee';

const store = new CustomStore({
    key: 'id',
    load: async (loadOptions: any) => {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    skip: loadOptions.skip,
                    take: loadOptions.take,
                    sort: JSON.stringify(loadOptions.sort),
                    filter: JSON.stringify(loadOptions.filter),
                    searchValue: loadOptions.searchValue,
                    searchExpr: JSON.stringify(loadOptions.searchExpr),
                }
            });

            return {
                data: response.data.data,
                totalCount: response.data.totalCount
            };
        } catch (error: any) {
            return {
                data: [],
                totalCount: 0
            };
        }
    },

    insert: async (values) => {
        console.log("Insert to server:", values);
        await axios.post(API_URL, values);
        notify("Data berhasil ditambahkan", "success", 2000);
    },

    update: async (key, values) => {
        console.log("Update to server:", key, values);
        await axios.put(`${API_URL}/${key}`, values);
        notify("Data berhasil diubah", "success", 2000);
    },

    remove: async (key) => {
        console.log("Delete from server:", key);
        await axios.delete(`${API_URL}/${key}`);
        notify("Data berhasil dihapus", "success", 2000);
    }

});


export function CompanyEmployeeTable() {
	return (
		<React.Fragment>
			<DataGrid
                export={{ 
                    enabled: true,
                    allowExportSelectedData: true,
                    texts: {
                        exportAll: "Export All",
                        exportSelectedRows: "Export Selected Rows",
                        exportTo: "Export To"
                    }
                }}
                onExporting={
                    async (e) => {
                        const workbook = new Workbook();
                        const worksheet = workbook.addWorksheet('Main sheet');

                        const exportDataGrid = await import("devextreme/excel_exporter").then(m => m.exportDataGrid);
                        
                        await exportDataGrid({
                            component: e.component,
                            worksheet,
                            autoFilterEnabled: true,
                        });

                        const buffer = await workbook.xlsx.writeBuffer();
                        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataPegawai.xlsx');
                        e.cancel = true;
                    }
                }
				dataSource={store}
				keyExpr="id"
                remoteOperations={true}
				allowColumnReordering={true}
				allowColumnResizing={true}
				columnAutoWidth={true}
				scrolling={{ mode: "standard" }}
				headerFilter={{ visible: true }}
				searchPanel={{ visible: true, placeholder: "Cari..." }}
				editing={{ 
                    mode: "popup", 
                    allowUpdating: true, 
                    allowDeleting: true, 
                    allowAdding: true, 
                    confirmDelete: true,
                    useIcons: true
                }}
				paging={{ pageSize: 5 }}
				pager={{
					showPageSizeSelector: true,
					allowedPageSizes: [5, 10, 20],
					showNavigationButtons: true,
					showInfo: true,
					displayMode: "compact"
				}}
				>
                <Column
                    dataField="employee_id"
                    caption="Full Name"
                    lookup={{
                        dataSource: {
                        load: async () => {
                            const res = await axios.get("http://localhost:3000/employee");
                            return res.data.data;
                        }
                        },
                        displayExpr: "full_name",
                        valueExpr: "employee_id"
                    }}
                />

                <Column
                    dataField="company_id"
                    caption="Company Name"
                    lookup={{
                        dataSource: {
                        load: async () => {
                            const res = await axios.get("http://localhost:3000/company");
                            return res.data.data;
                        }
                        },
                        displayExpr: "company_name",
                        valueExpr: "company_id"
                    }}
                />

				<Column dataField="assigned_at" dataType="datetime" ></Column>
                <Column
                    type="buttons"
                    caption="Aksi"
                    width={180}
                    buttons={[
                        'edit',
                        'delete',
                        {
                            hint: 'View Detail',
                            icon: 'info',
                            onClick: (e) => {
                                const row = e.row?.data;
                                console.log("Detail dari:", row);
                                notify(`Detail untuk ${row.FullName}`, "info", 2000);
                            }
                        },
                        {
                            hint: 'Approve',
                            icon: 'check',
                            onClick: async (e) => {
                                const row = e.row?.data;
                                console.log("Approved:", row);
                                // await axios.post(`http://localhost:3000/company-employee/${row.company_id}/${row.employee_id}/approve`);
                                notify(`${row.full_name} dari company ${row.company_name} telah disetujui`, "success", 2000);
                            }
                        }
                    ]}
                />
			</DataGrid>
		</React.Fragment>
	)
}
