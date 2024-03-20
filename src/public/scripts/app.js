$(document)
    .ready(() => {
        // Patients Page
        var $patientsSearchButton = $('#patients-search-button');
        var $patientsSearchInput = $('#patients-search-input');
        var $patientsSearchForm = $('#patients-search-form');

        $patientsSearchButton.on('click', () => onPatientsSearchEvent(event, $patientsSearchInput));
        $patientsSearchForm.submit((event) => onPatientsSearchEvent(event, $patientsSearchInput));

        // Surveys Page
        var $surveysSearchButton = $('#surveys-search-button');
        var $surveysSearchInput = $('#surveys-search-input');
        var $surveysSearchForm = $('#surveys-search-form');

        $surveysSearchButton.on('click', () => onSearchEvent(event, $surveysSearchInput));
        $surveysSearchForm.submit((event) => onSearchEvent(event, $surveysSearchInput));

        // Questions Page
        var $questionsSearchButton = $('#questions-search-button');
        var $questionsSearchInput = $('#questions-search-input');
        var $questionsSearchForm = $('#questions-search-form');

        $questionsSearchButton.on('click', () => onSearchEvent(event, $questionsSearchInput));
        $questionsSearchForm.submit((event) => onSearchEvent(event, $questionsSearchInput));

        // setSurveyFilter();
    });

// Private
function setSurveyFilter() {
    var surveyFilterCookieKey = 'surveyFilter'
    var $surveyFilterSelect = $('#survey-filter');
    var $surveyFilterSelectOptions = $('#survey-filter option');

    var surveyFilterCookieValue = getCookie(surveyFilterCookieKey);

    if (surveyFilterCookieValue.length > 0) {
        var isSurveyCookieInOptions =
            $surveyFilterSelectOptions.filter(o => o.value === surveyFilterCookieValue).length > 0;

        $surveyFilterSelect.val(surveyFilterCookieValue);
    } else {
        $surveyFilterSelect.val('');
        setCookie(surveyFilterCookieKey, '');
    }

    $surveyFilterSelect.change(() => {
        setCookie(surveyFilterCookieKey, $surveyFilterSelect.val());
        location.reload();
    });
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function onSearchEvent(event, $searchInput) {
    event.preventDefault();

    var inputData = $searchInput.val();
    var query = window.location.search;

    var updatedQuerySkip = updateQueryStringParameter(query, 'skip', 0);
    var updatedQueryTake = updateQueryStringParameter(updatedQuerySkip, 'take', 10);
    var updatedQuerySearch = updateQueryStringParameter(updatedQueryTake, 'search', inputData);

    document.location = updatedQuerySearch;
}

function onPatientsSearchEvent(event, $searchInput) {
    event.preventDefault();

    var inputData = $searchInput.val();
    var query = window.location.search;

    var updatedQuerySkip = updateQueryStringParameter(query, 'skip', 0);
    var updatedQueryTake = updateQueryStringParameter(updatedQuerySkip, 'take', 10);
    var updatedQuery = createQueryStringParameter(updatedQueryTake, 'surveyed', 'not-surveyed');
    var updatedQuerySearch = updateQueryStringParameter(updatedQuery, 'search', inputData);

    document.location = updatedQuerySearch;
}

function updateQueryStringParameter(uri, key, value) {
    var re = createRegexForQuery(key);
    var separator = createSeparatorForQuery(uri);
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

function createQueryStringParameter(uri, key, value) {
    var re = createRegexForQuery(key);
    var separator = createSeparatorForQuery(uri);
    if (uri.match(re)) {
        return uri;
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

function createRegexForQuery(key) {
    return new RegExp("([?&])" + key + "=.*?(&|$)", "i");
}

function createSeparatorForQuery(uri) {
    return uri.indexOf('?') !== -1 ? "&" : "?";
}
