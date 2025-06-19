-- Seed courses
INSERT INTO courses (id, title, description, icon, level, lesson_count, order)
VALUES
  ('javascript-basics', 'JavaScript Basics', 'Learn the fundamentals of JavaScript programming', 'code', 'Beginner', 10, 1),
  ('html-css', 'HTML & CSS Fundamentals', 'Master the building blocks of the web', 'fileCode', 'Beginner', 8, 2),
  ('react-essentials', 'React Essentials', 'Build modern user interfaces with React', 'code', 'Intermediate', 12, 3)
ON CONFLICT (id) DO NOTHING;

-- Seed modules for JavaScript Basics
INSERT INTO modules (id, course_id, title, description, order)
VALUES
  ('js-module-1', 'javascript-basics', 'Getting Started', 'Introduction to JavaScript', 1),
  ('js-module-2', 'javascript-basics', 'Control Flow', 'Conditionals and loops in JavaScript', 2),
  ('js-module-3', 'javascript-basics', 'Functions', 'Working with functions in JavaScript', 3)
ON CONFLICT (id) DO NOTHING;

-- Seed lessons for JavaScript Basics - Getting Started module
INSERT INTO lessons (id, course_id, module_id, title, content, starter_code, language, next_lesson_id, order)
VALUES
  (
    'js-lesson-1', 
    'javascript-basics', 
    'js-module-1', 
    'Introduction to JavaScript', 
    '<h2>Welcome to JavaScript!</h2><p>JavaScript is a programming language that powers the dynamic behavior on websites. It is an essential skill for web developers.</p><h3>What You''ll Learn</h3><ul><li>How to write your first JavaScript code</li><li>How to use the console for debugging</li><li>Basic syntax and structure</li></ul><h3>Your First JavaScript Code</h3><p>Let''s start by writing a simple "Hello, World!" program:</p><pre><code>console.log("Hello, World!");</code></pre><p>Try running this code in the editor!</p>', 
    'console.log("Hello, World!");', 
    'javascript', 
    'js-lesson-2', 
    1
  ),
  (
    'js-lesson-2', 
    'javascript-basics', 
    'js-module-1', 
    'Variables and Data Types', 
    '<h2>Variables and Data Types</h2><p>Variables are containers for storing data values. JavaScript has several data types including numbers, strings, booleans, and more.</p><h3>Declaring Variables</h3><p>In JavaScript, you can declare variables using <code>let</code>, <code>const</code>, or <code>var</code>:</p><pre><code>// Using let (recommended for variables that will change)
let name = "John";

// Using const (for variables that won''t change)
const age = 30;

// Different data types
let isStudent = true; // Boolean
let score = 85.5;     // Number
let greeting = "Hello"; // String
let person = {        // Object
  name: "Alice",
  age: 25
};
let colors = ["red", "green", "blue"]; // Array</code></pre><p>Try creating some variables of different types in the editor!</p>', 
    '// Declare variables of different types
let name = "Your name";
const age = 25;
let isLearning = true;

// Print them to the console
console.log("Name:", name);
console.log("Age:", age);
console.log("Is learning:", isLearning);

// Try creating an object and an array', 
    'javascript', 
    'js-lesson-3', 
    2
  ),
  (
    'js-lesson-3', 
    'javascript-basics', 
    'js-module-1', 
    'Operators and Expressions', 
    '<h2>Operators and Expressions</h2><p>JavaScript has various operators for performing operations on values and variables.</p><h3>Arithmetic Operators</h3><p>These operators perform arithmetic operations:</p><pre><code>let a = 10;
let b = 5;

console.log(a + b);  // Addition: 15
console.log(a - b);  // Subtraction: 5
console.log(a * b);  // Multiplication: 50
console.log(a / b);  // Division: 2
console.log(a % b);  // Modulus (remainder): 0</code></pre><h3>Comparison Operators</h3><p>These operators compare values and return a boolean:</p><pre><code>console.log(a > b);   // Greater than: true
console.log(a < b);   // Less than: false
console.log(a >= b);  // Greater than or equal to: true
console.log(a <= b);  // Less than or equal to: false
console.log(a === b); // Equal to (value and type): false
console.log(a !== b); // Not equal to: true</code></pre><p>Try using different operators in the editor!</p>', 
    '// Arithmetic operators
let x = 20;
let y = 10;

// Calculate and print the results of different operations
console.log("Addition:", x + y);
console.log("Subtraction:", x - y);
console.log("Multiplication:", x * y);
console.log("Division:", x / y);

// Comparison operators
console.log("Is x greater than y?", x > y);
console.log("Is x equal to y?", x === y);

// Try creating your own expressions', 
    'javascript', 
    NULL, 
    3
  )
ON CONFLICT (id) DO NOTHING;

-- Seed modules for HTML & CSS
INSERT INTO modules (id, course_id, title, description, order)
VALUES
  ('html-module-1', 'html-css', 'HTML Basics', 'Learn the structure of web pages', 1),
  ('html-module-2', 'html-css', 'CSS Fundamentals', 'Style your web pages with CSS', 2)
ON CONFLICT (id) DO NOTHING;

-- Seed lessons for HTML & CSS - HTML Basics module
INSERT INTO lessons (id, course_id, module_id, title, content, starter_code, language, next_lesson_id, order)
VALUES
  (
    'html-lesson-1', 
    'html-css', 
    'html-module-1', 
    'HTML Document Structure', 
    '<h2>HTML Document Structure</h2><p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. Every HTML document has a basic structure.</p><h3>Basic HTML Structure</h3><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;My First Heading&lt;/h1&gt;
  &lt;p&gt;My first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre><p>This structure includes:</p><ul><li><code>&lt;!DOCTYPE html&gt;</code>: Declares the document type</li><li><code>&lt;html&gt;</code>: The root element</li><li><code>&lt;head&gt;</code>: Contains meta-information</li><li><code>&lt;title&gt;</code>: Specifies the page title</li><li><code>&lt;body&gt;</code>: Contains the visible content</li></ul><p>Try creating a basic HTML document in the editor!</p>',
