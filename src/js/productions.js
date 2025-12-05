// Productions functionality
let productionTabCounter = 1;

document.addEventListener('DOMContentLoaded', function() {
    // Add production tab button
    document.getElementById('add-production-tab').addEventListener('click', addProductionTab);
    
    // Add event listeners for task buttons (using event delegation)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-outline-primary')) {
            // Accept task
            e.target.classList.remove('btn-outline-primary');
            e.target.classList.add('btn-primary');
            e.target.textContent = 'Принят';
            
            // Update status in UI
            const taskItem = e.target.closest('.list-group-item');
            const statusBadge = taskItem.querySelector('.status-badge') || document.createElement('span');
            statusBadge.className = 'status-badge badge bg-warning';
            statusBadge.textContent = 'Принят';
            
            if (!taskItem.querySelector('.status-badge')) {
                const taskContent = taskItem.querySelector('div:first-child');
                taskContent.appendChild(statusBadge);
            }
        }
        
        if (e.target.classList.contains('btn-outline-success')) {
            // Complete task
            e.target.classList.remove('btn-outline-success');
            e.target.classList.add('btn-success');
            e.target.textContent = 'Выполнен';
            
            // Update status in UI
            const taskItem = e.target.closest('.list-group-item');
            const statusBadge = taskItem.querySelector('.status-badge') || document.createElement('span');
            statusBadge.className = 'status-badge badge bg-success';
            statusBadge.textContent = 'Выполнен';
            
            if (!taskItem.querySelector('.status-badge')) {
                const taskContent = taskItem.querySelector('div:first-child');
                taskContent.appendChild(statusBadge);
            }
        }
    });
});

function addProductionTab() {
    productionTabCounter++;
    
    const tabsContainer = document.getElementById('productions-tabs');
    const tabContentContainer = document.getElementById('productions-tab-content');
    
    // Create new tab link
    const newTab = document.createElement('li');
    newTab.className = 'nav-item';
    newTab.innerHTML = `
        <a class="nav-link" data-bs-toggle="tab" href="#production-${productionTabCounter}">Производство ${productionTabCounter}</a>
    `;
    
    // Create new tab content
    const newTabContent = document.createElement('div');
    newTabContent.className = 'tab-pane fade';
    newTabContent.id = `production-${productionTabCounter}`;
    newTabContent.innerHTML = `
        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Название производства</label>
                            <input type="text" class="form-control" placeholder="Введите название">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Контакты</label>
                            <textarea class="form-control" placeholder="Контактная информация"></textarea>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Статус</label>
                            <select class="form-select">
                                <option value="active">Активный</option>
                                <option value="inactive">Неактивный</option>
                                <option value="pending">Ожидание</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Услуги</label>
                            <select class="form-select" multiple>
                                <option value="dtf">DTF печать</option>
                                <option value="screen">Шелкография</option>
                                <option value="sublimation">Сублимация</option>
                                <option value="embroidery">Вышивка</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <h5 class="mt-4">Задачи</h5>
                <div class="list-group">
                    <div class="list-group-item">
                        <div class="d-flex justify-content-between">
                            <div>
                                <h6>Новая задача</h6>
                                <p class="mb-1">Описание задачи</p>
                            </div>
                            <div>
                                <button class="btn btn-sm btn-outline-primary">Принять</button>
                                <button class="btn btn-sm btn-outline-success">Выполнено</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    tabsContainer.appendChild(newTab);
    tabContentContainer.appendChild(newTabContent);
    
    // Activate the new tab
    setTimeout(() => {
        const newNavLink = newTab.querySelector('a');
        if (newNavLink) {
            newNavLink.click();
        }
    }, 100);
}