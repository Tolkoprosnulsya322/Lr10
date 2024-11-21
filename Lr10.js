window.onload = function () {
    const spinButton = document.getElementById('spin-button');
    const rows = [
        document.getElementById('row1'),
        document.getElementById('row2'),
        document.getElementById('row3'),
    ];
    const icons = ['🍒', '🍋', '🍉', '⭐', '🔔', '7️⃣'];

    // Генерація випадкових символів для слотів
    function generateRandomSlots() {
        return Array.from({ length: 3 }, () =>
            Array.from({ length: 3 }, () => icons[Math.floor(Math.random() * icons.length)])
        );
    }

    // Анімація обертання барабанів
    function animateReels(rowsData) {
        rows.forEach((row, rowIndex) => {
            const slots = Array.from(row.children);

            slots.forEach((slot, slotIndex) => {
                // Початкове значення до анімації
                slot.style.transform = 'translateY(0)';
                slot.style.transition = 'none';

                // Імітація прокручування (3 оберти)
                setTimeout(() => {
                    slot.style.transition = 'transform 1s ease-in-out';
                    slot.style.transform = 'translateY(-300%)';
                }, slotIndex * 100);

                // Затримка для відображення результату
                setTimeout(() => {
                    slot.style.transition = 'none';
                    slot.style.transform = 'translateY(0)';
                    slot.textContent = rowsData[rowIndex][slotIndex];
                }, 1000); // Тривалість анімації
            });
        });
    }

    // Перевірка виграшу
    function checkWin(rowsData) {
        let win = false;

        rowsData.forEach((row, rowIndex) => {
            if (row[0] === row[1] && row[1] === row[2]) {
                win = true;
                alert(`🎉 Виграш у рядку ${rowIndex + 1}: ${row[0]} ${row[1]} ${row[2]}!`);
            }
        });

        if (!win) {
            alert('😢 Немає виграшу. Спробуйте ще раз!');
        }
    }

    // Кнопка "Обертати"
    spinButton.onclick = function () {
        const rowsData = generateRandomSlots();
        animateReels(rowsData);
        setTimeout(() => checkWin(rowsData), 1100); // Перевірка після завершення анімації
    };
};
