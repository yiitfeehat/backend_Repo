module.exports = function dateToLocaleString(date) {
    return new Date(date).toLocaleString("tr-TR", {
        dateStyle: "short",
        timeStyle: "medium"  // bu saat:dakika:saniye'yi de içerir
    });
};
// 5 Mayıs 2025 Pazartesi => Full
// Timsetyle medium : 20.19.03