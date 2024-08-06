import React, { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Toolbar from '../Components/ComparisonToolbar/ComparisonToolbar';
import ComparisonTable from '../Components/ComparisonTable/ComparisonTable';
import './ReportsPage.css';

const UyumTakibiPage = () => {
  const [month, setMonth] = useState('');
  const [revision1, setRevision1] = useState('');
  const [revision2, setRevision2] = useState('');

  const tableData = [
    { factory: 'PVC', product: 'S23/59', rev1: 22, rev2: 15, diff: 17.5, conformity: 84.1 },
    // Diğer veri satırla 
    { factory: 'PVC', product: 'S23/59', rev1: 22, rev2: 25, diff: 3, compliance: 84.1 },
    { factory: 'PVC', product: 'S27R/63', rev1: 8, rev2: 3, diff: 6, compliance: 50 },
    { factory: 'PVC', product: 'S39/71', rev1: 38, rev2: 0, diff: 9, compliance: 50 },
    { factory: 'PVC', product: 'S65R/68', rev1: 20, rev2: 10, diff: 5, compliance: 75 },
    { factory: 'PVC', product: 'D', rev1: 28, rev2: 25, diff: 2, compliance: 0 },
    { factory: 'AYPE', product: 'G03-5', rev1: 29, rev2: 29, diff: 5, compliance: 0 },
    { factory: 'AYPE', product: 'H2-8', rev1: 2, rev2: 2, diff: 0, compliance: 0 },
    { factory: 'AYPE', product: 'F2-12', rev1: 27, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'G08-21T', rev1: 0, rev2: 0, diff: 0, compliance: 70 },
    { factory: 'AYPE-T', product: 'G08-21TA', rev1: 6, rev2: 3, diff: 0, compliance: 70 },
    { factory: 'AYPE-T', product: 'G03-21T', rev1: 1, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'H2-21T', rev1: 9, rev2: 4, diff: 0, compliance: 70 },
    { factory: 'AYPE-T', product: 'F2-21T', rev1: 5, rev2: 5, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'F5-21T', rev1: 5, rev2: 5, diff: 1, compliance: 75 },
    { factory: 'AYPE-T', product: 'H5-21T', rev1: 4, rev2: 2, diff: 1, compliance: 75 },
    { factory: 'AYPE-T', product: 'I22-19T', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'I22-19TA', rev1: 3, rev2: 3, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'H7-20T', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'AYPE-T', product: 'D', rev1: 1, rev2: 1, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'I668 (UV)', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'S0464', rev1: 5, rev2: 5, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'S0459', rev1: 5, rev2: 5, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'F00756', rev1: 6, rev2: 3, diff: 1.5, compliance: 70 },
    { factory: 'YYPE', product: 'B00552', rev1: 6, rev2: 3, diff: 1.5, compliance: 70 },
    { factory: 'YYPE', product: 'B00552/D', rev1: 6, rev2: 3, diff: 1.5, compliance: 70 },
    { factory: 'YYPE', product: 'I457 (UV)', rev1: 10, rev2: 5, diff: 2.5, compliance: 50 },
    { factory: 'YYPE', product: 'I860 (UV)', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'I860 (O)', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'I457 (O)', rev1: 3, rev2: 3, diff: 0, compliance: 0 },
    { factory: 'YYPE', product: 'D', rev1: 4, rev2: 4, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH241', rev1: 3, rev2: 3, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH102', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH251', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'AG251', rev1: 2, rev2: 2, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH418', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH418 (%50)', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH220', rev1: 5, rev2: 5, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH180', rev1: 10, rev2: 5, diff: 2.5, compliance: 275 },
    { factory: 'PP', product: 'EH341', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'AG241', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH082', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH318', rev1: 3, rev2: 3, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH251/MH418', rev1: 9, rev2: 9, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'EH122/EH102', rev1: 4, rev2: 4, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'D', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PP', product: 'MH418/MH220', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'MB', product: 'F03', rev1: 9, rev2: 9, diff: 0, compliance: 0 },
    { factory: 'PTA', product: 'Ü', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PTA', product: 'D', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PA', product: 'Ü', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PA', product: 'D', rev1: 1, rev2: 0, diff: 0, compliance: 0 },
    { factory: 'PA', product: 'PA (%50)', rev1: 0, rev2: 0, diff: 0, compliance: 0 },
  ];
  

  return (
    <div className="reports-page">
      <Navbar />
      <Toolbar
        month={month}
        setMonth={setMonth}
        revision1={revision1}
        setRevision1={setRevision1}
        revision2={revision2}
        setRevision2={setRevision2}
      />
      <div className="tables-and-chart">
        <div className="table-container">
          <ComparisonTable title="UYUM TAKİBİ" data={tableData} />
          
        </div>
      </div>
    </div>
  );
};

export default UyumTakibiPage;
