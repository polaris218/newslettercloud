import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import get from 'lodash/get'

import { Table, Column } from 'common/widgets'
import EmptyList from 'components/EmptyList'


export default function PopularLinks({ mostActive, seeAll }) {
  return (
    <>
      <Table
        list={{ results: mostActive.data }}
        isLoading={mostActive.isLoading}
        placeholderComponent={
          <EmptyList
            placeholderDescription={<FormattedMessage id="overviewChart.emptyRecipients" />}
            withoutImage={true}
          />
        }
      >
        <Column
          field="contact"
          title="Email"
          width="50%"
          format={(value, item) => item.contact_url ? <Link to={item.contact_url}>{value}</Link> : value}
        />
        <Column
          field="opens"
          title="Openings"
          format={value => value || 0}
        />
        <Column
          field="clicks"
          title="Link Clicks"
          format={value => value || 0}
        />
      </Table>
      {
        !!get(mostActive, 'data.length') &&
        <div className="text-center">
          <button className="btn-link btn-sm btn-link--underline p-0" onClick={seeAll}>
            <FormattedMessage id="detailedReport.recipients.seeAll" />
          </button>
        </div>
      }
    </>
  )
}
