import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";
export { removetv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {

    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalid = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const translations = await axios.get(`/tv/${id}/translations`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchproviders = await axios.get(`/tv/${id}/watch/providers`);

        let theultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map(t=>t.name),
            videos: videos.data.results.find((video) => video.type === 'Trailer'),
            watchproviders: watchproviders.data.results.IN,
        };
        // console.log(theultimatedetails);
        dispatch(loadtv(theultimatedetails));

    } catch (e) { console.log('Error:', e) }
}
