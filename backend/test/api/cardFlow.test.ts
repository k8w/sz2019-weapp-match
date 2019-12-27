import * as assert from 'assert';
import { testApiClient } from '../Base';
import * as fse from "fs-extra";
import * as path from "path";
import { Card } from '../../src/protocols/Card';

describe('Card Flow', function () {

    let card: Card = {
        id: '',
        name: 'test',
        desc: 'test123',
        lastModified: Date.now()
    };
    it('add', async function () {
        let res = await testApiClient.callApi('SaveCard', {
            openId: 'test',
            card: card
        });
        card.id = res.cardId;
    })

    it('getList', async function () {
        let res = await testApiClient.callApi('GetCardList', {
            openId: 'test'
        });
        assert.ok(res.list.find(v => v.id === card.id));
    })

    it('getCard', async function () {
        let res = await testApiClient.callApi('GetCard', {
            openId: 'test',
            cardId: card.id
        });
        assert.deepStrictEqual(res.card, card);
    })

    it('delCard', async function () {
        let res = await testApiClient.callApi('DelCard', {
            openId: 'test',
            cardId: card.id
        });
        let resList = await testApiClient.callApi('GetCardList', {
            openId: 'test'
        });
        assert.equal(resList.list.findIndex(v => v.id === card.id), -1);
    })
})