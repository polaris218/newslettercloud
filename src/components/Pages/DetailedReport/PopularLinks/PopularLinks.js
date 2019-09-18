import React from 'react'
import { FormattedMessage } from 'react-intl'
import get from 'lodash/get'

import { Table, Column } from 'common/widgets'
import EmptyList from 'components/EmptyList'


export default function PopularLinks({ popularLinks, seeAll }) {
  return (
    <>
      <Table
        list={{ results: popularLinks.data }}
        isLoading={popularLinks.isLoading}
        placeholderComponent={
          <EmptyList
            placeholderDescription={<FormattedMessage id="overviewChart.emptyLinks" />}
            withoutImage={true}
          />
        }
      >
        <Column
          field="link"
          title="Link url"
          width="50%"
        />
        <Column
          field="unique_clicks"
          title="Unique clicks"
          format={value => value || 0}
        />
        <Column
          field="percent_of_total"
          title="% of total"
          format={value => +value.toFixed(1)}
        />
      </Table>
      {
        !!get(popularLinks, 'data.length') &&
        <div className="text-center">
          <button className="btn-link btn-sm btn-link--underline p-0" onClick={seeAll}>
            <FormattedMessage id="detailedReport.links.seeAll" />
          </button>
        </div>
      }
    </>
  )
}
