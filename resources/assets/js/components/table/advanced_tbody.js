import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import AdvancedRow from './advanced_row';

export default class AdvancedTbody extends React.Component {

    static propTypes = {
        tid: PropTypes.string.isRequired,
        tbody: ImmutablePropTypes.list.isRequired,
    }

    render () {
        const { tid, tbody } = this.props;

        return (
            <tbody key={tid + '_body'}>
                {tbody.map((row, i) =>
                    <AdvancedRow key={tid + '_body_advanced_row' + i} k={tid + '_body'} row={row} row_number={i} />
                )}
            </tbody>
        );
    }

}
