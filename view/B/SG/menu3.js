var countryPrefix = localStorage.getItem("urlPrefix");
document.write('\
<script>\
document.addEventListener("DOMContentLoaded", function() {\
    var countryPrefix = localStorage.getItem("urlPrefix");\
    document.getElementById("deliveryServicesLink").setAttribute("href", "/B/" + countryPrefix + "/services1.html");\
    document.getElementById("assemblyServicesLink").setAttribute("href", "/B/" + countryPrefix + "/services2.html");\
    document.getElementById("planningGuideLink").setAttribute("href", "/B/" + countryPrefix + "/services3.html");\
});\
</script>');