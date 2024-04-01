const axios = require('axios');
const { API_BASE_URL, API_KEY } = require('../config');
const { compareValues } = require('../utils');

async function getFilteredResponses(req, res) {
    try {
        const { formId } = req.params;
        const filters = req.query.filters ? JSON.parse(req.query.filters) : [];
        const limit = req.query.limit || 19;
        const offset = req.query.offset || 0;
        
        const response = await axios.get(`${API_BASE_URL}/v1/api/forms/${formId}/submissions`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
            params: {
                limit,
                offset,
                filters: JSON.stringify(filters)
            }
        });

        const filteredResponses = response?.data?.responses?.filter((submission) => {            
            return filters?.every(filter => {
                const question = submission?.questions?.find((item) => item?.id === filter?.id);
                if (!question) return false;
                return compareValues(question?.value, filter?.value, filter?.condition);
            });
        });

        const paginatedResponses = filteredResponses?.slice(offset, offset + limit) || [];
        const totalResponses = filteredResponses?.length || 0;
        const pageCount = Math.ceil(totalResponses / limit);

        const responseObject = {
            responses: paginatedResponses,
            totalResponses,
            pageCount
        };

        res.json(responseObject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { getFilteredResponses };
