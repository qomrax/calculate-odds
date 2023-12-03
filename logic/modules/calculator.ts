import { SessionAxios } from 'backend-helper-kit'
import { config } from '../../config'
import { calculateOdds, odd } from '../types/odds/output-type'

export const calculator = new SessionAxios({
    baseURL: `http://localhost:${config.PORT}`
})

export async function calculateOdds(data: object, odds: number[], time: string, place: string): Promise<calculateOdds> {
    return (
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
    ).data.result
}
