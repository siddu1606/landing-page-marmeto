// function openMen() {
//     document.getElementById("content").innerHTML = "<img src='./assets/menCatalogue/men1.jpg' alt='men1'><img src='./assets/menCatalogue/men2.jpg' alt='men2'><img src='./assets/menCatalogue/men3.jpg' alt='men3'>";
    
// }

// function openWomen() {
//     document.getElementById("content").innerHTML = "<img src='women.jpg' alt='women1'><img src='women2.jpg' alt='women2'><img src='women3.jpg' alt='women3'><img src='women4.jpg' alt='women4'>";
// }

// function openKid() {
//     document.getElementById("content").innerHTML = "<img src='kid1.jpg' alt='kid1'><img src='kid2.jpg' alt='kid2'><img src='kid3.jpg' alt='kid3'>";
// }


function changeButtonStyle(button) {
    // Reset styles for all buttons
    var buttons = document.querySelectorAll('.button');
    buttons.forEach(function(btn) {
        // Change text color of all buttons to initial color
        btn.style.color = ''; // Reverting text color to initial state
        btn.style.backgroundColor = '#fff';
        btn.querySelector('.icon').style.display = 'none';
    });

    // Change style for the clicked button
    button.style.backgroundColor = 'black';
    button.style.color = '#F0EBE3'; // Change text color to white for the clicked button
    button.querySelector('.icon').style.display = 'inline'; // Display the icon
    //button.querySelector('.icon').style.justifiy-content = 'evenly'; 

}

async function fetchData(categoryName) {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();

        // Find the category data based on the categoryName
        const categoryData = data.categories.find(category => category.category_name.toLowerCase() === categoryName.toLowerCase());

        if (!categoryData) {
            console.error(`Category "${categoryName}" not found.`);
            return null;
        }

        return categoryData.category_products;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Event listener for button clicks
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', async function() {
        // Change button style
        changeButtonStyle(this);

        // Get category name (e.g., Men, Women, Kid)
        const categoryName = this.textContent.trim();

        // Fetch data based on category name
        const products = await fetchData(categoryName);

        if (products) {
            // Clear previous content
            document.getElementById('content').innerHTML = '';

            // Process fetched data and display in content element
            const contentElement = document.getElementById('content');
            products.forEach(product => {
                // Create product container
                const productContainer = document.createElement('div');
                productContainer.classList.add('product');
            

                 // Badge
                 if (product.badge_text) {
                    const badge = document.createElement('div');
                    badge.textContent = product.badge_text;
                    badge.classList.add('badge');
                    productContainer.appendChild(badge);
                }
            
                // Product image
                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.classList.add('product-image'); // Add a class for styling
                productContainer.appendChild(productImage);
            
               
                // Product details container
                const productDetails = document.createElement('div');
                productDetails.classList.add('product-details');

                const producTitleContainer= document.createElement('div');
                producTitleContainer.classList.add('product-title-container');

                productDetails.appendChild(producTitleContainer);
                    // Product title
                    const title = document.createElement('h2');
                    title.textContent = product.title;
                    producTitleContainer.appendChild(title);
                
                    // Vendor
                    const vendor = document.createElement('p');
                    vendor.textContent ="-   "+ product.vendor;
                    producTitleContainer.appendChild(vendor);
                
                // Price
                const productDescriptionContainer= document.createElement('div');
                productDescriptionContainer.classList.add('product-description-container');
                productDetails.appendChild(productDescriptionContainer);

                // Price
                const price = document.createElement('p');
                price.textContent = 'Rs. ' + product.price;
                productDescriptionContainer.appendChild(price);
            
                // Compare at price
                const comparePrice = document.createElement('p');
                comparePrice.textContent =  product.compare_at_price;
                comparePrice.classList.add('compare-price');
                productDescriptionContainer.appendChild(comparePrice);
            
                // Calculate percentage off
                const percentageOff = document.createElement('p');
                const percentage = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
                percentageOff.textContent = percentage + '% Off';
                if (percentage > 0) {
                    percentageOff.classList.add('percentage-off');
                }
                productDescriptionContainer.appendChild(percentageOff);
            
                // Add to Cart button
                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add to Cart';
                addToCartButton.classList.add('add-to-cart');
                productDetails.appendChild(addToCartButton);
            
                // Append product details to product container
                productContainer.appendChild(productDetails);
            
                // Append product container to content element
                contentElement.appendChild(productContainer);
            });
            
        } else {
            // Handle error or no data fetched
            console.log('Error fetching products.');
        }
    });
});