document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const medicineList = document.getElementById('medicineList');
    const searchBtn = document.getElementById('searchBtn');
    
    const heroContent = document.getElementById('heroContent');
    const resultsSection = document.getElementById('resultsSection');
    const aiProcessing = document.getElementById('aiProcessing');
    
    const featuredName = document.getElementById('featuredName');
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    const resetBtn = document.getElementById('resetBtn');

    let allMedicines = [];

    // Fetch medicines
    fetch('/api/medicines')
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                allMedicines = data;
                data.forEach(med => {
                    const opt = document.createElement('option');
                    opt.value = med;
                    medicineList.appendChild(opt);
                });
            }
        })
        .catch(err => console.error("Could not load medicine list:", err));

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (!query) return;

        // Show processing
        resultsSection.classList.add('hidden');
        aiProcessing.classList.remove('hidden');
        
        // Disable search while processing
        searchBtn.disabled = true;
        
        // Simulate a slight delay for the cinematic "AI Processing" feel
        setTimeout(() => {
            fetch(`/api/recommend?medicine=${encodeURIComponent(query)}`)
                .then(res => res.json())
                .then(data => {
                    aiProcessing.classList.add('hidden');
                    searchBtn.disabled = false;

                    if (data.error) {
                        alert(data.error);
                        return;
                    }
                    
                    // Update UI
                    featuredName.textContent = data.medicine;
                    recommendationsGrid.innerHTML = '';
                    
                    data.recommendations.forEach(med => {
                        const card = document.createElement('div');
                        card.className = 'rec-card';
                        card.innerHTML = `
                            <div class="rec-card-header">
                                <div class="rec-icon"><i class="fa-solid fa-capsules"></i></div>
                                <h4>${med}</h4>
                            </div>
                            <a href="https://pharmeasy.in/search/all?name=${encodeURIComponent(med)}" target="_blank" class="buy-btn">
                                <span>PharmEasy Acquisition</span>
                                <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.8rem;"></i>
                            </a>
                        `;
                        recommendationsGrid.appendChild(card);
                    });
                    
                    resultsSection.classList.remove('hidden');
                    
                    // Smooth scroll to results
                    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                })
                .catch(err => {
                    console.error(err);
                    alert('Connection error. Is the server running?');
                    aiProcessing.classList.add('hidden');
                    searchBtn.disabled = false;
                });
        }, 1200); // 1.2 second simulated delay
    };

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') performSearch();
    });

    // Reset view
    resetBtn.addEventListener('click', () => {
        searchInput.value = '';
        resultsSection.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
