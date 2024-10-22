import React, { useState, useEffect, useMemo } from 'react';
import { Layout, DatePicker, Dropdown, Button, Card, Checkbox, Menu, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import EmailTable from './EmailTable';
import emailService from '../services/EmailService';
import { TokenService } from '../services/TokenService';
import './Dashboard.css';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';
import 'moment/locale/pt-br';

const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Search } = Input;

moment.locale('pt-br');

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [collapsed, setCollapsed] = useState(false);
  const [emails, setEmails] = useState([]);
  const [metrics, setMetrics] = useState([
    { title: 'E-mails enviados', value: 0 },
    { title: 'E-mails lidos', value: 0 },
    { title: 'E-mails não lidos', value: 0 },
    { title: 'E-mails no spam', value: 0 },
    { title: 'E-mails deletados', value: 0 },
  ]);
  const [emailData, setEmailData] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [senderFilter, setSenderFilter] = useState('');
  const [dateRange, setDateRange] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const user_id = TokenService.getUserId();
        const data = await emailService.getEmailList(user_id);
        setEmails(data);
      } catch (error) {
        console.error('Erro ao buscar e-mails:', error);
        navigate('/login');
      }
    };

    fetchEmails();
  }, [navigate]);

  // Filtrar e-mails
  const filteredEmails = useMemo(() => {
    return emails.filter((email) => {
      const matchesTitle = email.subject
        ? email.subject.toLowerCase().includes(titleFilter.toLowerCase())
        : true;
      const matchesSender = email.sender
        ? email.sender.toLowerCase().includes(senderFilter.toLowerCase())
        : true;

      const emailDate = moment(email.date_received, 'YYYY-MM-DD HH:mm:ss');

      let matchesDate = true;
      if (dateRange && dateRange.length === 2) {
        const [startDate, endDate] = dateRange;

        const formattedEmailDate = emailDate.format('DD/MM/YYYY');
        const formattedStartDate = startDate.format('DD/MM/YYYY');
        const formattedEndDate = endDate.format('DD/MM/YYYY');

        matchesDate =
          formattedEmailDate >= formattedStartDate &&
          formattedEmailDate <= formattedEndDate;
      }

      return matchesTitle && matchesSender && matchesDate;
    });
  }, [emails, titleFilter, senderFilter, dateRange]);

  // Atualizar métricas e dados do gráfico quando os e-mails filtrados mudarem
  useEffect(() => {
    updateMetrics(filteredEmails);
    prepareChartData(filteredEmails);
  }, [filteredEmails]);

  const updateMetrics = (data) => {
    const sentEmails = data.filter((email) => email.folder && email.folder.includes('E-mails enviados')).length;
    const readEmails = data.filter((email) => email.is_read === 1).length;
    const unreadEmails = data.filter((email) => email.is_read === 0).length;
    const spamEmails = data.filter((email) => email.is_spam === 1).length;
    const deletedEmails = data.filter((email) => email.is_deleted === 1).length;

    setMetrics([
      { title: 'E-mails enviados', value: sentEmails },
      { title: 'E-mails lidos', value: readEmails },
      { title: 'E-mails não lidos', value: unreadEmails },
      { title: 'E-mails no spam', value: spamEmails },
      { title: 'E-mails deletados', value: deletedEmails },
    ]);
  };

  const prepareChartData = (data) => {
    if (!data || data.length === 0) {
      setEmailData([]);
      return;
    }

    const emailsByDay = data.reduce((acc, email) => {
      const emailDate = moment(email.date_received, 'YYYY-MM-DD HH:mm:ss');
      if (emailDate.isValid()) {
        const day = emailDate.format('DD/MM/YYYY');
        if (!acc[day]) {
          acc[day] = {
            total: 0,
            read: 0,
            unread: 0,
            opened: 0,
            spam: 0,
            deleted: 0,
          };
        }
        acc[day].total += 1;
        acc[day].read += email.is_read === 1 ? 1 : 0;
        acc[day].unread += email.is_read === 0 ? 1 : 0;
        acc[day].opened += email.is_opened === 1 ? 1 : 0; // Certifique-se de que essa propriedade existe
        acc[day].spam += email.is_spam === 1 ? 1 : 0;     // Certifique-se de que essa propriedade existe
        acc[day].deleted += email.is_deleted === 1 ? 1 : 0; // Certifique-se de que essa propriedade existe
      }

      return acc;
    }, {});

    const chartData = Object.keys(emailsByDay)
      .sort((a, b) => moment(a, 'DD/MM/YYYY').toDate() - moment(b, 'DD/MM/YYYY').toDate())
      .map((day) => ({
        name: day,
        ...emailsByDay[day],
      }));

    setEmailData(chartData);
  };

  // Componente de tooltip personalizado para o gráfico geral
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: '#fff',
            padding: '10px',
            border: '1px solid #ccc',
          }}
        >
          <p>
            <strong>Data:</strong> {label}
          </p>
          <p>
            <strong>Quantidade:</strong> {data.total}
          </p>
          <p>
            <strong>E-mails lidos:</strong> {data.read}
          </p>
          <p>
            <strong>E-mails não lidos:</strong> {data.unread}
          </p>
          <p>
            <strong>Spam:</strong> {data.spam}
          </p>
          <p>
            <strong>Deletados:</strong> {data.deleted}
          </p>
        </div>
      );
    }

    return null;
  };

  // Novo componente de tooltip para o gráfico de spam
  const SpamTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: '#fff',
            padding: '10px',
            border: '1px solid #ccc',
          }}
        >
          <p>
            <strong>Data:</strong> {label}
          </p>
          <p>
            <strong>Quantidade:</strong> {data.spam}
          </p>
        </div>
      );
    }

    return null;
  };

  const accountOptions = (
    <Menu>
      <Menu.Item key="1">
        <Checkbox defaultChecked>pessoa@email.com.br</Checkbox>
      </Menu.Item>
      <Menu.Item key="2">
        <Checkbox>pessoa2@email.com.br</Checkbox>
      </Menu.Item>
      <Menu.Item key="3">
        <Checkbox>pessoa3@email.com.br</Checkbox>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="m-0" style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '16px' }}>
          <div className="dashboard-grid">
            <div className="date-range-section">
              <h2>Tempo da análise</h2>
              <RangePicker
                style={{ width: '30%' }}
                locale={locale}
                onChange={(dates) => setDateRange(dates)}
              />
              <Dropdown overlay={accountOptions} placement="bottomCenter">
                <Button style={{ marginTop: 16 }}>Contas analisadas</Button>
              </Dropdown>
            </div>

            {/* Gráficos */}
            <div className="charts-section">
              <div className="chart-container">
                <h3>E-mails recebidos por dia</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={emailData}>
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#8884d8"
                      strokeWidth={3}
                      animationDuration={1000}
                      dot={false}
                    />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h3>E-mails na caixa de spam</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={emailData}>
                    <Line
                      type="monotone"
                      dataKey="spam"
                      stroke="#82ca9d"
                      strokeWidth={3}
                      animationDuration={1000}
                      dot={false}
                    />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<SpamTooltip />} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cartões de Métricas */}
            <div className="metrics-section">
              {metrics.map((metric) => (
                <Card
                  key={metric.title}
                  style={{ marginBottom: '16px' }}
                  bodyStyle={{
                    padding: '20px',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                  title={metric.title}
                >
                  {metric.value}
                </Card>
              ))}
            </div>
          </div>

          {/* Filtros */}
          <div className="filters-section" style={{ marginTop: 16 }}>
            <Search
              placeholder="Filtrar por título"
              onChange={(e) => setTitleFilter(e.target.value)}
              style={{ width: 200, marginRight: 16 }}
            />
            <Search
              placeholder="Filtrar por remetente"
              onChange={(e) => setSenderFilter(e.target.value)}
              style={{ width: 200 }}
            />
          </div>

          {/* Tabela de E-mails */}
          <EmailTable emails={filteredEmails} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
