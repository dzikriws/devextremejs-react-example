import React from "react";
import { DataGrid, Column } from 'devextreme-react/data-grid';
import notify from "devextreme/ui/notify";
import CustomStore from 'devextreme/data/custom_store';
import axios from "axios";
import { Workbook } from 'exceljs';
import saveAs from 'file-saver';

const API_URL = 'http://localhost:3000/company';

const store = new CustomStore({
    key: 'company_id',
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
        console.error("Gagal load data:", error);
        // Jangan lempar error langsung, DevExtreme tidak suka itu
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


export function CompanyTable() {

    // ini dipakai kalo client handling, bukan dari backend
	// const handleRowInserting = useCallback((e : any) => {
    //     // try {
    //     //     axios.post("BASE_URL/endpoint", e.data);
    //     //     notify("Data berhasil ditambahkan", "success", 2000);
    //     // }catch (error) {
    //     //     notify("Data gagal ditambahkan", "error", 2000);
    //     // }
    //     notify("Data berhasil ditambahkan", "success", 2000);
    //     console.log("Insert:", e.data);
	// }, []);

    // ini dipakai kalo client handling, bukan dari backend
	// const handleRowUpdating = useCallback((e : any) => {
	// 	// try {
    //     //     axios.put(`BASE_URL/endpoint/:${id}`, e.data);
    //     //     notify("Data berhasil ditambahkan", "success", 2000);
    //     // }catch (error) {
    //     //     notify("Data gagal ditambahkan", "error", 2000);
    //     // }
	// 	notify("Data berhasil diperbarui", "success", 2000);
    //     console.log("Update:", e.data);
	// }, []);

    // ini dipakai kalo client handling, bukan dari backend
	// const handleRowRemoving = useCallback((e : any) => {
    //     // try {
    //     //     axios.delete(`BASE_URL/endpoint/:${id}`);
    //     //     notify("Data berhasil ditambahkan", "success", 2000);
    //     // }catch (error) {
    //     //     notify("Data gagal ditambahkan", "error", 2000);
    //     // }
	// 	notify("Data berhasil dihapus", "success", 2000);
	// 	console.log("Hapus:", e.data);
	// }, []);

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

                        e.cancel = true; // Mencegah export default
                    }
                }
				// dataSource={employees} // ini dipakai kalo client handling
				dataSource={store}
				keyExpr="company_id"
                remoteOperations={true} // Wajib, jika ingin menghubungkan ke data dari backend juga untuk filtering dan searching
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
                    // form: {
                    //     labelLocation: "top",
                    //     items : [{
                    //         dataField: "FullName",
                    //         editorOptions: {
                    //             disabled: true
                    //         }
                    //     }]
                    // }
                }}
                // onRowInserted={handleRowInserting} // ini dipakai kalo client handling, bukan dari backend
                // onRowUpdated={handleRowUpdating}  // ini dipakai kalo client handling, bukan dari backend
                // onRowRemoved={handleRowRemoving}  // ini dipakai kalo client handling, bukan dari backend
				paging={{ pageSize: 5 }}
				pager={{
					showPageSizeSelector: true,
					allowedPageSizes: [5, 10, 20],
					showNavigationButtons: true,
					showInfo: true,
					displayMode: "compact"
				}}
				>
				<Column dataField="company_name" dataType="string" fixed={true}></Column>
				<Column dataField="address" dataType="string"></Column>
				<Column dataField="city" dataType="string" visible={false}/>
				<Column dataField="region" dataType="string" visible={false}></Column>
				<Column dataField="postal_code" dataType="string" visible={false} />
				<Column dataField="contact_person" dataType="string"/>
				<Column dataField="phone" dataType="string" visible={false}/>
				<Column dataField="website" dataType="string" visible={false}/>
				<Column dataField="country" dataType="string"/>
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
                                // await axios.post(`http://localhost:3000/employee/${row.EmployeeID}/approve`);
                                notify(`${row.FullName} telah disetujui`, "success", 2000);
                            }
                        }
                    ]}
                />
			</DataGrid>
		</React.Fragment>
	)
}
