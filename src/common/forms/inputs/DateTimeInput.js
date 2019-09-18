import React, {Component} from 'react'
import moment from 'moment'
import { dateAndTimeToISO } from 'common/utils/formatDate'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class DateTimeInput extends Component {
  handleChange = (date) => {
    this.props.onChange(dateAndTimeToISO(date))
  }

  render() {
    const { minDate } = this.props
    return (
      <DatePicker
        minDate={minDate}
        selected={this.props.value && moment(this.props.value)}
        onChange={this.handleChange}
        className={(this.props.meta.error && this.props.meta.touched) ? 'form-control error' : 'form-control'}
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM DD, YYYY HH:mm"
        timeCaption="time"
        showTimeSelect
      />
    );
  }
}
