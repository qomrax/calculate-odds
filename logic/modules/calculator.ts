import { SessionAxios } from 'backend-helper-kit'
import { config } from '../../config'
import { calculateOdds } from '../types/odds/output-type'

export const calculator = new SessionAxios({
    baseURL: `http://127.0.0.1:${config.FLASK_PORT}`
})

export async function calculateOdds(data: object, odds: number[], time: string, place: string): Promise<calculateOdds> {
    let res = (
        await calculator.request({
            method: 'POST',
            url: '/team-odds',
            data: {
                data,
                odds,
                time,
                place
            }
        })
    ).data

    // string to object

    return res.result
}
