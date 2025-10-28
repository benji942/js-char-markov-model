## Markov Chain Text Generator (Character-Level)

A command-line text generation tool built in **Node.js** that uses a character-level Markov Chain to generate new text sequences and complete words based on the literary style and vocabulary of a source text.

This project was trained on Alexandre Dumas's *Le Comte de Monte-Cristo* and is structured using principles of modular, **Functional Programming (FP)** in modern JavaScript (ES6+).

### 🎯 Key Skills Demonstrated

This project showcases an ability to implement complex algorithms while adhering to clean, modern JavaScript practices:

  * **Algorithmic Implementation:** Character-level Markov Chain (N-gram) logic for text synthesis.
  * **Modular Architecture:** Clean separation of concerns across `io.js` (I/O), `utils.js` (helpers), and `markov.js` (core logic).
  * **Functional Programming:** Heavy reliance on the `reduce`, `map`, and `filter` array methods, and use of pure functions (especially in `utils.js` and `markov.js`).
  * **Node.js Proficiency:** File system manipulation (`fs` module) and command-line execution.
  * **Data Processing:** Advanced text cleaning (handling encoding, punctuation, and white space in French).

-----

### 🧠 The Character-Level Markov Model (Order N)

Unlike a word-level model, this implementation uses an **N-gram approach** where the next character depends on the preceding $N$ characters.

  * **Order (N):** Defined in `index.js` (currently $N=10$). A higher order results in more contextually accurate, but less diverse, output.
  * **Model Building:** The `buildMarkovChain` function iterates through the text, creating a map where the **key** is a sequence of $N$ characters, and the **value** is an object listing the **transition counts** for the next possible characters.
  * **Generation:** The `generateNextChar` function uses a **probabilistic approach** to randomly select the next character based on its frequency following the current $N$-character sequence.

### 💻 Code Features & Implementation Highlights

| Feature | Description | File |
| :--- | :--- | :--- |
| **Advanced Text Cleaning** | Uses regular expressions to perform rigorous, French-locale aware cleaning: slicing headers/footers, lowercasing, and normalizing punctuation and spacing. | `utils.js` |
| **Functional Range Helper** | A pure function to generate arrays of numbers, used for efficient iteration in `markov.js`. | `utils.js` |
| **Core Logic Functions** | Separates the main tasks into distinct, reusable, and testable functions: `buildMarkovChain`, `generateNextChars`, and `completeWord`. | `markov.js` |
| **Word Completion Logic** | The `completeWord` function generates characters until a space or end-of-chain is hit, simulating the completion of a partial word. | `markov.js` |

-----

### 🚀 How to Run Locally

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/[YourUsername]/[RepoName].git
    cd [RepoName]
    ```
2.  **Add Source Data:** Create the folder structure and place your source text file.
    ```bash
    mkdir data
    # IMPORTANT: Place your text file here
    # e.g., data/compte-de-montecristo.txt
    ```
3.  **Execute the Script:**
    ```bash
    node index.js
    ```

#### **Sample Execution from `index.js`**

The current configuration in `index.js` tests two functions:

1.  **`generateNextChars`** (Starting with "bonjour je suis "):
    ```javascript
    const generatedText = generateNextChars(markovChain, 'bonjour je suis ', 100, 10);
    // [Outputs 100 characters of generated text]
    ```
2.  **`completeWord`** (Starting with "vous êtes un g"):
    ```javascript
    const completedWord = completeWord(markovChain, 'vous êtes un g', 10);
    // [Outputs the word completion, e.g., "vous êtes un gentil homme"]
    ```

-----

### ✨ Future Enhancements

  * **CLI Arguments:** Use a library like `commander` to allow the user to define the `order`, `start text`, and `N` (number of characters) via the command line.
  * **Higher Order Logic:** Implement an algorithm to automatically determine the optimal N-gram order for a given corpus.
  * **Model Saving:** Serialize the resulting Markov map to a JSON file to avoid rebuilding the model every time the script runs.
