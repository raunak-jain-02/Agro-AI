import re

# Read the file
with open(r'c:\Users\rauna\Documents\Projects\Agro-AI\agro-mitra-ai\src\pages\MarketAnalysis.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Define the old code block to replace
old_code = """    // Calculate average price change (mock calculation based on modal_price)
    let totalPriceChange = 0;
    marketData.forEach(item => {
      // This is a mock calculation - in a real app, you'd compare with historical data
      const randomChange = (Math.random() * 20) - 10; // Random value between -10 and 10
      totalPriceChange += randomChange;
    });
    const avgPriceChangeNum = totalPriceChange / marketData.length;
    const priceChangeDirection = avgPriceChangeNum >= 0 ? "+" : "";"""

# Define the new code block
new_code = """    // Calculate average price change based on actual market data
    // We calculate how much the modal price deviates from the midpoint of min and max prices
    let totalPriceChange = 0;
    marketData.forEach(item => {
      const minPrice = parseFloat(item.min_price) || 0;
      const maxPrice = parseFloat(item.max_price) || 0;
      const modalPrice = parseFloat(item.modal_price) || 0;
      
      if (modalPrice > 0 && minPrice > 0 && maxPrice > 0) {
        // Calculate the midpoint between min and max
        const midPoint = (minPrice + maxPrice) / 2;
        // Calculate percentage deviation of modal price from midpoint
        const deviation = ((modalPrice - midPoint) / midPoint) * 100;
        totalPriceChange += deviation;
      }
    });
    const avgPriceChangeNum = marketData.length > 0 ? totalPriceChange / marketData.length : 0;
    const priceChangeDirection = avgPriceChangeNum >= 0 ? "+" : "";"""

# Replace the code
content = content.replace(old_code, new_code)

# Write back to the file
with open(r'c:\Users\rauna\Documents\Projects\Agro-AI\agro-mitra-ai\src\pages\MarketAnalysis.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("File updated successfully!")
