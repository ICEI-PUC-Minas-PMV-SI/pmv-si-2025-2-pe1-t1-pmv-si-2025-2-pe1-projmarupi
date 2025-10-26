        let familyMembers = [];
        let editingIndex = null;
        let currentPhotoData = null;

        // Carregar dados salvos
        function loadFamily() {
            const saved = localStorage.getItem('familyTree');
            if (saved) {
                familyMembers = JSON.parse(saved);
                renderTree();
            }
        }

        // Salvar dados
        function saveFamily() {
            localStorage.setItem('familyTree', JSON.stringify(familyMembers));
        }

        // Renderizar árvore
        function renderTree() {
            const tree = document.getElementById('familyTree');
            const generations = {
                bisavo: [],
                avo: [],
                pai: [],
                eu: []
            };

            familyMembers.forEach((member, index) => {
                generations[member.relation].push({...member, index});
            });

            const labels = {
                bisavo: '👴👵 Bisavós',
                avo: '👴👵 Avós',
                pai: '👨👩 Pais',
                eu: '👤 Eu'
            };

            tree.innerHTML = '';
            
            ['bisavo', 'avo', 'pai', 'eu'].forEach(gen => {
                if (generations[gen].length > 0) {
                    const genDiv = document.createElement('div');
                    genDiv.className = 'generation-label';
                    genDiv.textContent = labels[gen];
                    tree.appendChild(genDiv);

                    const genContainer = document.createElement('div');
                    genContainer.className = 'generation';
                    
                    generations[gen].forEach(member => {
                        const card = createMemberCard(member);
                        genContainer.appendChild(card);
                    });
                    
                    tree.appendChild(genContainer);
                }
            });

            if (familyMembers.length === 0) {
                tree.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Nenhum membro adicionado ainda. Clique em "Adicionar Membro" para começar!</p>';
            }
        }

        // Criar card de membro
        function createMemberCard(member) {
            const card = document.createElement('div');
            card.className = 'member-card';
            
            card.innerHTML = `
                <div class="member-photo">
                    ${member.photo ? `<img src="${member.photo}" alt="${member.name}">` : '<span style="font-size: 3rem;">👤</span>'}
                </div>
                <div class="member-name">${member.name}</div>
                <div class="member-actions">
                    <button class="btn btn-small btn-edit" onclick="editMember(${member.index})">✏️</button>
                    <button class="btn btn-small btn-delete" onclick="deleteMember(${member.index})">🗑️</button>
                </div>
            `;
            
            return card;
        }

        // Adicionar membro
        function addMember() {
            editingIndex = null;
            currentPhotoData = null;
            document.getElementById('modalTitle').textContent = 'Adicionar Membro da Família';
            document.getElementById('memberForm').reset();
            document.getElementById('photoPreview').innerHTML = '<span style="color: #ccc;">📷</span>';
            document.getElementById('memberModal').classList.add('active');
        }

        // Editar membro
        function editMember(index) {
            editingIndex = index;
            const member = familyMembers[index];
            
            document.getElementById('modalTitle').textContent = 'Editar Membro';
            document.getElementById('memberName').value = member.name;
            document.getElementById('memberRelation').value = member.relation;
            
            if (member.photo) {
                currentPhotoData = member.photo;
                document.getElementById('photoPreview').innerHTML = `<img src="${member.photo}" alt="Preview">`;
            }
            
            document.getElementById('memberModal').classList.add('active');
        }

        // Deletar membro
        function deleteMember(index) {
            if (confirm('Tem certeza que deseja remover este membro?')) {
                familyMembers.splice(index, 1);
                saveFamily();
                renderTree();
            }
        }

        // Preview da foto
        function previewPhoto(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    currentPhotoData = e.target.result;
                    document.getElementById('photoPreview').innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                };
                reader.readAsDataURL(file);
            }
        }

        // Salvar membro
        function saveMember(event) {
            event.preventDefault();
            
            const member = {
                name: document.getElementById('memberName').value,
                relation: document.getElementById('memberRelation').value,
                photo: currentPhotoData
            };

            if (editingIndex !== null) {
                familyMembers[editingIndex] = member;
            } else {
                familyMembers.push(member);
            }

            saveFamily();
            renderTree();
            closeModal();
        }

        // Fechar modal
        function closeModal() {
            document.getElementById('memberModal').classList.remove('active');
        }

        // Resetar árvore
        function resetTree() {
            if (confirm('Tem certeza que deseja apagar toda a árvore genealógica?')) {
                familyMembers = [];
                saveFamily();
                renderTree();
            }
        }

        // Inicializar
        loadFamily();