import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { DetailedReportContext } from './DetailedReportContext';
import { getDetailedReport, deleteReport } from '../../services/reports';
import serviceStatus from '../../services/status';
import DetailedOverviewModel from './DetailedOverviewModel';

class _DetailedReportProvider extends Component {
  state = {
    mostPopularLinks: { results: [], status: serviceStatus.OK, active: '', error: {} },
    overview: DetailedOverviewModel.NULL
  };

  reportId = +this.props.match.params.id;
  _isMounted = false;

  getDetailedReport = async () => {
    this.setState({ ...DetailedOverviewModel.NULL, status: serviceStatus.LOADING, error: {} });

    const response = await getDetailedReport(this.reportId);

    if (!this._isMounted) return;

    if (response instanceof Error) {
      this.setState({
        overview: {
          ...DetailedOverviewModel.NULL,
          status: serviceStatus.ERROR,
          error: { status: response.status, message: response.message, reason: response.reason }
        }
      });
    } else {
      this.setState({ overview: { ...DetailedOverviewModel.create(response), status: serviceStatus.OK, error: {} } });
    }
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <DetailedReportContext.Provider
        value={{
          ...this.state,
          getDetailedReport: this.getDetailedReport,
          setFilterActiveLink: this.setFilterActiveLink,
          deleteReport: deleteReport
        }}
      >
        {this.props.children}
      </DetailedReportContext.Provider>
    );
  }
}

export const DetailedReportProvider = withRouter(_DetailedReportProvider);
