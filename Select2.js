// route should be like GET: /clients/json/select
// request vine asa in controller
// $name = $this->request->get('name');
// $result['items'] = $this->clientsRepository->getSelect($name);
// fara <script src="{{ asset('assets/js/pages/crud/forms/widgets/select2.js') }}" type="text/javascript"></script> // cred

let name = '';
$(document).ready(function () {
 name = $('.select2-search__field').val();
});
$(".kt-select2-general").select2({
    ajax: {
        url: '/clients/json/select' + name,
        dataType: 'json',
        delay: 250,
        data: function (params) {
            return {
                name: params.term, // search term
            };
        },
        processResults: function (data, params) {
            params.page = params.page || 1;
            return {
                results: data.items,
            };
        },
        cache: true
    },
    placeholder: 'Selectează o opțiune',
    escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
    minimumInputLength: 1,
    templateResult: formatRepo,
    templateSelection: formatRepoSelection
});

function formatRepo (client) {
    if (client.loading) {
        return client.text;
    }
    var markup = "<div class='select2-result-repository__title'>" + client.name + "</div>";
    return markup;
}

function formatRepoSelection (client) {
    return client.name || client.text;
}

