"use client"

import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Button
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  fetchSalary,
  fetchLangCountry,
  fetchCountryLocal,
  fetchCountries
} from '@/lib/features/dashboard/dashboardTruck';
import { clearDashboardData } from '@/lib/features/dashboard/dashboardSlice';
import TopMenu from '@/components/TopMenu';
import {
  PageContainer,
  ContentWrapper,
  Container,
  ContentCard
} from '../page.styled';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { salary, langCountry, countryLocal, countries } = useAppSelector(state => state.dashboard);
  const [tabValue, setTabValue] = useState(0);
  const { filters } = useAppSelector((state) => state.filter);

  useEffect(() => {
    // Load initial data
    dispatch(fetchSalary(filters));
    dispatch(fetchLangCountry(filters));
    dispatch(fetchCountryLocal(filters));
    dispatch(fetchCountries(filters));
  }, [dispatch, filters]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleRefresh = () => {
    dispatch(clearDashboardData());
    dispatch(fetchSalary(filters));
    dispatch(fetchLangCountry(filters));
    dispatch(fetchCountryLocal(filters));
    dispatch(fetchCountries(filters));
  };

  const renderTable = (data: any[], columns: { key: string; label: string; render?: (value: any, row: any) => React.ReactNode }[], loading: boolean, error: string | null) => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      );
    }

    if (data.length === 0) {
      return (
        <Alert severity="info" sx={{ m: 2 }}>
          No data available
        </Alert>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key} sx={{ fontWeight: 'bold' }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} hover>
                {columns.map((column) => (
                  <TableCell key={`${index}-${column.key}`}>
                    {column.render ? column.render(row[column.key], row) : row[column.key] || '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Column definitions for each table
  const salaryColumns = [
    { key: '_id', label: 'ID' , render: (value: string, row: any) => {
      const url = `https://www.linkedin.com/jobs/view/${value}`;
      return <a href={url} target="_blank"  style={{ background : row["closed"] ? "pink" : "lightgreen" , padding: "3px 5px"}} rel="noopener noreferrer">{value}</a>;
    }},
    { key: 'title', label: 'Job Title' },
    { key: 'standardizedTitle', label: 'Standardized Title' },
    { key: 'employmentStatus', label: 'Employment Status' },
    { key: 'workplaceTypes', label: 'Workplace Type' },
    { key: 'country', label: 'Country' },
    { key: 'lang', label: 'Language' },
    { 
      key: 'minSalary', 
      label: 'Min Salary',
      render: (value: string, row: any) => value ? `${value} ${row.currencyCode}` : '-'
    },
    { 
      key: 'maxSalary', 
      label: 'Max Salary',
      render: (value: string, row: any) => value ? `${value} ${row.currencyCode}` : '-'
    },
    { key: 'payPeriod', label: 'Pay Period' },
    { key: 'compensationType', label: 'Compensation Type' }
  ];

  const langCountryColumns = [
    { key: 'country', label: 'Country' },
    { key: 'lang', label: 'Language' },
    { key: 'count', label: 'Count' }
  ];

  const countryLocalColumns = [
    { key: '_id', label: 'Location' },
    { key: 'count', label: 'Total Jobs' },
    { key: 'deleted', label: 'Deleted' },
    { key: 'wait', label: 'Wait' },
    { key: 'appliedByMe', label: 'Applied By Me' }
  ];

  const countryColumns = [
    { key: '_id', label: 'Country' },
    { key: 'count', label: 'Total Jobs' },
    { key: 'deleted', label: 'Deleted' },
    { key: 'wait', label: 'Wait' },
    { key: 'appliedByMe', label: 'Applied By Me' }
  ];

  return (
    <PageContainer>
      <TopMenu />
      <ContentWrapper>
        <Container>
          <ContentCard>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h4" component="h1">
                Dashboard Analytics
              </Typography>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                disabled={salary.loading || langCountry.loading || countryLocal.loading || countries.loading}
              >
                Refresh All
              </Button>
            </Box>

            <Card>
              <CardContent>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
                  <Tab label="Salary Data" />
                  <Tab label="Language & Country" />
                  <Tab label="Country Local" />
                  <Tab label="Countries" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <Typography variant="h6" gutterBottom>
                    Salary Information ({salary.data.length} records)
                  </Typography>
                  {renderTable(salary.data, salaryColumns, salary.loading, salary.error)}
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Typography variant="h6" gutterBottom>
                    Language & Country Statistics ({langCountry.data.length} records)
                  </Typography>
                  {renderTable(langCountry.data, langCountryColumns, langCountry.loading, langCountry.error)}
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Typography variant="h6" gutterBottom>
                    Country Local Data ({countryLocal.data.length} records)
                  </Typography>
                  {renderTable(countryLocal.data, countryLocalColumns, countryLocal.loading, countryLocal.error)}
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                  <Typography variant="h6" gutterBottom>
                    Countries Overview ({countries.data.length} records)
                  </Typography>
                  {renderTable(countries.data, countryColumns, countries.loading, countries.error)}
                </TabPanel>
              </CardContent>
            </Card>
          </ContentCard>
        </Container>
      </ContentWrapper>
    </PageContainer>
  );
}