import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import api from 'api';

import { Button } from 'reactstrap';

// Component
const ExportResult = ({ id, myHeader }) => {
  const [loading, setLoading] = useState(false);
  // Exporting

  // File Type
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // Extension
  const fileExtension = '.xlsx';
  const exportToCSV = (csvData, fileName) => {
    // Setting cols width
    var wscols = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 35 },
      { wch: 28 },
      { wch: 35 },
      { wch: 50 },
      { wch: 90 },
      { wch: 50 },
      { wch: 50 },
      { wch: 58 },
      { wch: 90 },
      { wch: 46 },
      { wch: 50 },
      { wch: 55 },
      { wch: 46 },
      { wch: 43 },
      { wch: 31 },
      { wch: 30 },
      { wch: 30 }
    ];
    // Sorting

    const ws = XLSX.utils.json_to_sheet(
      csvData,
      { header: myHeader },
      {
        alignment: {
          vertical: 'center',
          horizontal: 'center',
          wrapText: '1' // any truthy value here
        }
      }
    );
    ws['!cols'] = wscols;

    const wb = { Sheets: { users: ws }, SheetNames: ['users'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const e_data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(e_data, fileName + fileExtension);
  };

  // exporting excel
  const handleSubmitExcel = async (id) => {
    console.log('id is', id);
    setLoading(true);
    // let res = await api('get', `/admin/users/getallusers`);
    let res = await api('get', `/admin/users/getsingleuserswithresult/${id}`);

    if (res) {
      let filterUserResults = res.users.filter((user) => user);
      console.log('filterUserResults', filterUserResults);
      let updatedUsers;
      if (filterUserResults.length > 0) {
        updatedUsers = filterUserResults.map((user) => {
          return {
            Prénom: user.first_name,
            Nom: user.last_name,
            'Date de naissance': new Date(user.date_of_birth).toLocaleString(),
            email: user.email,
            phone: user.phone,
            Last_answer: user?.userResult?.last_answer,
            Type_of_job: user?.userResult?.type_of_job,
            [user?.userResult?.question[0]?.question || '']:
              user?.userResult?.desc_answers[0]?.answer || '',
            [user?.userResult?.question[1]?.question || '']:
              user?.userResult?.desc_answers[1]?.answer || '',
            [user?.userResult?.question[2]?.question || '']:
              user?.userResult?.desc_answers[2]?.answer || '',
            [user?.userResult?.question[3]?.question || '']:
              user?.userResult?.desc_answers[3]?.answer || '',
            [user?.userResult?.question[4]?.question || '']:
              user?.userResult?.desc_answers[4]?.answer || '',
            [user?.userResult?.question[5]?.question || '']:
              user?.userResult?.desc_answers[5]?.answer || '',
            [user?.userResult?.question[6]?.question || '']:
              user?.userResult?.desc_answers[6]?.answer || '',
            [user?.userResult?.question[7]?.question || '']:
              user?.userResult?.desc_answers[7]?.answer || '',
            [user?.userResult?.question[8]?.question || '']:
              user?.userResult?.desc_answers[8]?.answer || '',
            [user?.userResult?.question[9]?.question || '']:
              user?.userResult?.desc_answers[9]?.answer || ''
          };
        });
      }
      setLoading(false);
      // console.log("users for export ", updatedUsers);
      exportToCSV(updatedUsers, ' données des utilisateurs');
    }
  };

  // Render
  return (
    <div className="d-flex justify-content-between ">
      <h3 className="mb-0"></h3>
      <Button
        color="primary"
        href="#pablo"
        onClick={(e) => {
          handleSubmitExcel(id);
        }}
        size="md"
        disabled={loading}
      >
        {loading ? 'Chargement en cours' : 'Exporter excel'}
      </Button>
    </div>
  );
};

export default ExportResult;
