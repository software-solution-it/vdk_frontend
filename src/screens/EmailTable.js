import React from 'react';
import { Table, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br'; 

const EmailTable = ({ emails, loading }) => {
  const handleDownload = (email) => {
    if (email.filename && email.content) {
      const blob = new Blob([new Uint8Array(atob(email.content).split("").map(c => c.charCodeAt(0)))], { type: email.mime_type });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = email.filename; // Nome do arquivo a ser baixado
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Arquivo não disponível para download');
    }
  };

  const columns = [
    {
      title: 'Assunto',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Remetente',
      dataIndex: 'sender',
      key: 'sender',
    },
    {
      title: 'Destinatário',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: 'Data',
      dataIndex: 'date_received',
      key: 'date_received',
      render: (text) => {
        if (text) {
          const date = moment(text, 'YYYY-MM-DD HH:mm:ss');
          return date.isValid() ? date.format('DD/MM/YYYY') : 'Data inválida';
        } else {
          return 'Data não disponível';
        }
      },
    }, 
    {
      title: 'Lido',
      dataIndex: 'is_read',
      key: 'is_read',
      render: (is_read) => (is_read ? 'Sim' : 'Não'),
    },
    {
      title: 'Anexo',
      dataIndex: 'filename',
      key: 'filename',
      render: (filename, email) => (
        filename ? (
          <Button onClick={() => handleDownload(email)} type="link">
            {filename}
          </Button>
        ) : (
          'Nenhum anexo'
        )
      ),
    },
  ];

  return (
    <Table
      dataSource={emails}
      columns={columns}
      loading={loading}
      rowKey="id"
      pagination={{ pageSize: 10 }}
      locale={{ emptyText: 'Nenhum dado encontrado' }}
    />
  );
};

export default EmailTable;
