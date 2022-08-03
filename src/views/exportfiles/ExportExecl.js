import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useState } from 'react';
import api from 'api';

import { Button } from 'reactstrap';

// Component
const ExportExecl = ({ Users, myHeader }) => {
  const [loading, setLoading] = useState(false);
  // Exporting

  // File Type
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  // Extension
  const fileExtension = '.xlsx';
  const exportToCSV = (csvData, fileName) => {
    // Sorting

    const ws = XLSX.utils.json_to_sheet(csvData, { header: myHeader });

    const wb = { Sheets: { users: ws }, SheetNames: ['users'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const e_data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(e_data, fileName + fileExtension);
  };

  // exporting excel
  const handleSubmitExcel = async (Users) => {
    setLoading(true);
    let res = await api('get', `/admin/users/getallusers`);
    if (res) {
      let filterUserResults = res.users.filter((user) => user);
      let updatedUsers;
      if (filterUserResults.length > 0) {
        updatedUsers = filterUserResults.map((user) => {
          return {
            Prénom: user.first_name,
            Nom: user.last_name,
            'Date de naissance': new Date(user.date_of_birth).toLocaleString(),
            addresse: user.address?.label,
            email: user.email,
            phone: user.phone,
            Classe: user.education_level,
            'Établissement actuel': user.institute
            // domain: user?.userResult?.domain,
            // Last_answer: user?.userResult?.last_answer,
            // Type_of_job: user?.userResult?.type_of_job,
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
      <h3 className="mb-0">Utilisateurs</h3>
      <Button
        color="primary"
        href="#pablo"
        onClick={(e) => {
          handleSubmitExcel(Users);
        }}
        size="md"
        disabled={loading}
      >
        {loading ? 'Chargement en cours' : 'Exporter excel'}
      </Button>
    </div>
  );
};

export default ExportExecl;
