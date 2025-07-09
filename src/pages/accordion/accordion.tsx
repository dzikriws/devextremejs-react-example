import React, { useEffect, useState } from 'react';
import { Accordion, Autocomplete } from 'devextreme-react';
import axios from 'axios';

interface data {
  id: number | string;
  title: string;
}

export function AccordionPage() {
  const [data, setData] = useState<data[]>([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        const mappedData = res.data.slice(0, 10).map((item: any) => ({
          id: item.id,
          title: item.title
        }));
        setData(mappedData);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
      });
  }, []);

  const autocompleteData = [
    { country: 'Afghanistan', capital: 'Kabul' },
    { country: 'Albania', capital: 'Tirana' },
    // ...
  ];

  return (
    <React.Fragment>
      <h2 className={'content-block'}>Home</h2>
      <div className={'content-block'}>
        <div className={'dx-card responsive-paddings'}>
          <Accordion
            dataSource={data}
            collapsible={true}
            multiple={true}
            animationDuration={200}
            itemTitleRender={(item: data) => <div className="font-semibold">{item.id}</div>}
            itemRender={(item: data) => <div className="text-sm text-gray-700">{item.title}</div>}
            visible={data.length > 0}
          />

            <Autocomplete
                dataSource={autocompleteData}
                valueExpr="country"
                searchMode="contains"
                minSearchLength={3}
            />

        </div>
      </div>
    </React.Fragment>
  );
}
