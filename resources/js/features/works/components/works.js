import React from 'react';
import { List, Map, fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SimpleCardDeck from 'src/components/cards/simple_card_deck';

export default class Works extends React.Component {

    static propTypes = {
        works: ImmutablePropTypes.list,
    }

    componentWillMount() {
        if ( this.props.works === null || this.props.works === undefined ) {
            this.props.onRefresh();
        }
    }

    thead = List.of(
        List.of(
            Map({ 'isTitle': true, 'isLink': false, 'txt': '名称' }),
            Map({ 'isTitle': true, 'isLink': false, 'txt': 'URL' }),
            Map({ 'isTitle': true, 'isLink': false, 'txt': '説明' }),
            Map({ 'isTitle': true, 'isLink': false, 'txt': 'タグ' }),
        )
    );

    render() {
        const { works } = this.props;
        let cards = [];
        if (works !== undefined && works !== null) {
            works.map(row => {
                let formatted_card = {};
                let formatted_card_body = [];
                let formatted_card_foot = [];
                let formatted_card_img = {};

                // <画像>
                const image_path = row.get('image_path');
                if (image_path === '') {
                    formatted_card_img.src = 'data:image/svg+xml;charset=UTF-8,<svg%20width%3D"286"%20height%3D"180"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%20286%20180"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_1624ce18f10%20text%20{%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20}%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_1624ce18f10"><rect%20width%3D"286"%20height%3D"180"%20fill%3D"%23777"><%2Frect><g><%2Fg><%2Fg><%2Fsvg>';
                    formatted_card_img.alt = 'None';
                } else {
                    formatted_card_img.src = row.get('image_url');
                    formatted_card_img.alt = row.get('name');
                }
                // </画像>

                // <名称>
                const name = row.get('name');
                const name_obj = { type: 'title', txt: name };
                formatted_card_body.push(name_obj);
                // </名称>

                // <説明>
                let description = row.get('description');
                if (description.length > 50) {
                    description = description.slice(0, 50) + '...';
                }
                const description_obj = { type: 'txt', 'txt': description };
                formatted_card_body.push(description_obj);
                // </説明>

                // <詳細ページ>
                const id = row.get('id');
                let url_obj = {};
                url_obj = { type: 'link', txt: '詳しく', 'link': '/works/' + id };
                formatted_card_body.push(url_obj);
                // </詳細ページ>

                // <タグ>
                const tags = row.get('tags');
                tags.forEach((tag) => {
                    formatted_card_foot.push(tag.get('name'));
                });
                // </タグ>

                formatted_card.body = formatted_card_body;
                formatted_card.foot = formatted_card_foot;
                formatted_card.img = formatted_card_img;
                cards.push(formatted_card);
            });

            // 何もない時に表示するやつ
            if (works.size === 0) {
                cards.push({
                    img: {
                        src: 'data:image/svg+xml;charset=UTF-8,<svg%20width%3D"286"%20height%3D"180"%20xmlns%3D"http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg"%20viewBox%3D"0%200%20286%20180"%20preserveAspectRatio%3D"none"><defs><style%20type%3D"text%2Fcss">%23holder_1624ce18f10%20text%20{%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20}%20<%2Fstyle><%2Fdefs><g%20id%3D"holder_1624ce18f10"><rect%20width%3D"286"%20height%3D"180"%20fill%3D"%23777"><%2Frect><g><%2Fg><%2Fg><%2Fsvg>',
                        alt: 'None',
                    },
                    body: [
                        { type: 'txt', 'txt': 'None' },
                    ],
                    foot: [
                        'None',
                    ],
                });
            }
        }

        cards = fromJS(cards); // to immutable

        return (
            <div className='m-3'>
                <p>Works</p>
                <div className='card'>
                    <div key={'main_works'} className='card-body' style={{ overflowX: 'scroll' }}>
                        <SimpleCardDeck cid='main_works_deck' cards={cards} />
                    </div>
                </div>
            </div>
        );
    }

}
