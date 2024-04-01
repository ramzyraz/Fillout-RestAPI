const compareValues = (submissionValue, filterValue, condition) => {
    if (!isNaN(submissionValue) && !isNaN(filterValue)) {
        submissionValue = Number(submissionValue);
        filterValue = Number(filterValue);
    }

    if (!isNaN(Date.parse(submissionValue)) && !isNaN(Date.parse(filterValue))) {
        submissionValue = new Date(submissionValue)?.toISOString();
        filterValue = new Date(filterValue)?.toISOString();
    }

    switch (condition) {
        case 'equals':
            return submissionValue === filterValue;
        case 'does_not_equal':
            return submissionValue !== filterValue;
        case 'greater_than':
            return submissionValue > filterValue;
        case 'less_than':
            return submissionValue < filterValue;
        default:
            return false;
    }
};

module.exports = { compareValues };
