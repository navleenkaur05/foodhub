// Browser-only order form handler

document.addEventListener('DOMContentLoaded', () => {

    const orderForm = document.querySelector('.order-form');

    if (!orderForm) return;

    orderForm.addEventListener('submit', async (evt) => {

        evt.preventDefault();

        const formData = new FormData(orderForm);

        const params = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            params.append(key, value);
        }

        try {

            const res = await fetch('/order', {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'application/x-www-form-urlencoded'
                },
                body: params.toString()
            });

            const text =
                await res.text();

            alert(text);

            orderForm.reset();

        } catch (err) {

            console.error(
                'Order request failed',
                err
            );

            alert(
                'Failed to place order'
            );

        }

    });

});