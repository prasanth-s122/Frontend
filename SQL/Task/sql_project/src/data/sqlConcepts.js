export const sqlConcepts = [
  {
    id: "introduction",
    title: "1. Introduction to SQL & RDBMS",
    category: "basics",
    difficulty: "easy",
    shortDescription: "Understand the core architecture of relational databases, schemas, tables, and database engine structures.",
    description: `
      <p><strong>Structured Query Language (SQL)</strong> is the standard domain-specific programming language designed for managing, querying, and manipulating data stored in <strong>Relational Database Management Systems (RDBMS)</strong>.</p>
      
      <h4>What is a Relational Database?</h4>
      <p>Relational databases represent and store data as a collection of <strong>Tables</strong> (technically called <em>Relations</em>). The system was designed by Edgar F. Codd in 1970 and is grounded in mathematical set theory. Unlike simple key-value spreadsheets, an RDBMS maintains defined relationships between tables using keys, preventing data duplication and maintaining absolute consistency.</p>
      
      <div class="theory-deep-dive" style="background: rgba(0, 242, 254, 0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
        <h5 style="margin-top:0; color:var(--accent-primary);">🧠 Architectural Fundamentals:</h5>
        <ul>
          <li><strong>Database Schema:</strong> The structural blueprint or skeleton of the entire database, defining tables, column types, relationships, indexes, and constraints.</li>
          <li><strong>Table:</strong> An entity collection representing a specific model (e.g., <code>employees</code>). Consists of horizontal **Rows** (or *Records*) and vertical **Columns** (or *Attributes*).</li>
          <li><strong>Rows (Records):</strong> A single, unique instance of an object (e.g., employee Alice Vance, ID #1). Every row must conform to the table's column definitions.</li>
          <li><strong>Columns (Attributes):</strong> The individual fields making up a table. Each column is bound to a strict <strong>Data Type</strong> (such as <code>INT</code>, <code>VARCHAR</code>, <code>DECIMAL</code>, or <code>DATE</code>).</li>
          <li><strong>Primary Key (PK):</strong> A column (or set of columns) that uniquely identifies each row in a table. It cannot contain duplicate values and can never be <code>NULL</code>.</li>
        </ul>
      </div>

      <h4>Why Use SQL?</h4>
      <p>SQL is highly declarative: instead of writing complex procedural algorithms to fetch files from disk, you describe <em>what</em> data you want, and the database's internal **Query Optimizer** figures out the most efficient way to locate and deliver the results.</p>
      
      <p>Popular modern RDBMS engines include <strong>PostgreSQL</strong>, <strong>MySQL</strong>, <strong>SQLite</strong>, <strong>Microsoft SQL Server</strong>, and <strong>Oracle Database</strong>. While minor dialect variations exist, they all conform to standard SQL syntax.</p>
    `,
    syntax: "SELECT * FROM table_name;",
    cheatSheet: "SELECT * returns all attributes. Good for discovery, but avoid SELECT * in production to minimize memory and network bandwidth.",
    playground: {
      challenge: "Inspect the database structure. Execute a SELECT statement to retrieve all records and columns from the 'employees' table.",
      initialQuery: "SELECT * FROM employees;",
      validationQuery: "select * from employees",
      tables: {
        employees: [
          { id: 1, name: "Alice Vance", role: "Software Engineer", department_id: 10, salary: 95000 },
          { id: 2, name: "Bob Miller", role: "Data Analyst", department_id: 20, salary: 78000 },
          { id: 3, name: "Charlie Song", role: "DevOps Engineer", department_id: 10, salary: 98000 },
          { id: 4, name: "Diana Prince", role: "Product Manager", department_id: 30, salary: 110000 },
          { id: 5, name: "Evan Wright", role: "Designer", department_id: 30, salary: 82000 }
        ]
      }
    }
  },
  {
    id: "select-from",
    title: "2. SELECT & FROM (Projections & Aliasing)",
    category: "basics",
    difficulty: "easy",
    shortDescription: "Learn projections, limiting data columns, AS renaming, and standard SQL execution order.",
    description: `
      <p>The <code>SELECT</code> clause is the primary building block of data retrieval. It handles <strong>Projection</strong>, which is the database operation of filtering out columns that are not needed in the query response.</p>
      
      <h4>The Order of Database Execution:</h4>
      <p>In standard programming, code executes from top to bottom. In SQL, queries are evaluated in a different order than they are written. For example:</p>
      <div style="font-family: var(--font-mono); font-size: 0.85rem; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 4px; margin: 12px 0; color: #a78bfa;">
        1. FROM (Finds the target table)<br />
        2. SELECT (Filters and formats specific columns)<br />
        3. LIMIT (Restricts row counts)
      </div>
      <p>Because the <code>FROM</code> runs first, the database must locate and parse the table before it begins reading your chosen <code>SELECT</code> columns.</p>

      <div class="theory-deep-dive" style="background: rgba(0, 242, 254, 0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
        <h5 style="margin-top:0; color:var(--accent-primary);">💡 Core Techniques & Best Practices:</h5>
        <ul>
          <li><strong>Avoid SELECT * in Production:</strong> Requesting all columns forces the database to read extra fields from memory or disk, increasing network lag. Explicitly name your columns.</li>
          <li><strong>Column Aliasing (AS):</strong> You can temporarily rename output columns using the <code>AS</code> keyword. This is incredibly helpful for renaming shorthand developer column names into readable formats for reports.</li>
          <li><strong>Expression SELECTs:</strong> You can select derived or calculated data. For example, <code>SELECT salary * 1.1 AS increased_salary</code> calculates an imaginary 10% raise on the fly.</li>
        </ul>
      </div>
    `,
    syntax: "SELECT column_name_1, column_name_2 AS alias_name FROM table_name;",
    cheatSheet: "AS is optional in many dialects, but explicitly writing 'AS' improves query readability.",
    playground: {
      challenge: "Select the 'name' and 'salary' columns from the 'employees' table, and alias the 'salary' column as 'annual_income' to create a clean financial report.",
      initialQuery: "SELECT name, salary FROM employees;",
      validationQuery: "select name, salary as annual_income from employees",
      tables: {
        employees: [
          { id: 1, name: "Alice Vance", role: "Software Engineer", salary: 95000 },
          { id: 2, name: "Bob Miller", role: "Data Analyst", salary: 78000 },
          { id: 3, name: "Charlie Song", role: "DevOps Engineer", salary: 98000 },
          { id: 4, name: "Diana Prince", role: "Product Manager", salary: 110000 },
          { id: 5, name: "Evan Wright", role: "Designer", salary: 82000 }
        ]
      }
    }
  },
  {
    id: "where-clause",
    title: "3. WHERE Clause (Logical Filtering)",
    category: "basics",
    difficulty: "easy",
    shortDescription: "Master Boolean predicates, numerical ranges, wildcards, and Three-Valued Logic.",
    description: `
      <p>The <code>WHERE</code> clause is used to filter records based on specific criteria. It evaluates a <strong>Predicate</strong>—a logical statement that evaluates to <code>TRUE</code>, <code>FALSE</code>, or <code>UNKNOWN</code> for each row.</p>
      
      <h4>Logical Operators:</h4>
      <ul>
        <li><code>=</code> (Equal), <code>&lt;&gt;</code> or <code>!=</code> (Not Equal).</li>
        <li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code> (Range operators).</li>
        <li><code>BETWEEN value1 AND value2</code>: Filters values within an inclusive range.</li>
        <li><code>IN (val1, val2, ...)</code>: Checks if a value matches any item in a comma-separated list.</li>
        <li><code>LIKE</code> & <code>ILIKE</code>: Pattern matching. Uses <code>%</code> as a wildcard for zero or more characters, and <code>_</code> for exactly one character (e.g., <code>'A%'</code> matches Alice, but not Bob). <code>ILIKE</code> is case-insensitive.</li>
      </ul>

      <div class="theory-deep-dive" style="background: rgba(0, 242, 254, 0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
        <h5 style="margin-top:0; color:var(--accent-primary);">⚠️ Warning: Three-Valued Logic (The Null Trap)</h5>
        <p>In databases, <code>NULL</code> represents a state of <em>unknown or missing information</em>. It does not equal zero or an empty string. If you check <code>WHERE salary = NULL</code>, it evaluates to <code>UNKNOWN</code>, and no rows will return. To filter null values, you must explicitly use the special operators <strong><code>IS NULL</code></strong> or <strong><code>IS NOT NULL</code></strong>.</p>
      </div>

      <h4>Operator Precedence:</h4>
      <p>When combining filters with <code>AND</code> and <code>OR</code>, remember that <code>AND</code> has higher precedence. Use parentheses to ensure conditions evaluate in the order you intend.</p>
    `,
    syntax: "SELECT columns FROM table WHERE condition1 AND (condition2 OR condition3);",
    cheatSheet: "Use LIKE '%term%' to match keywords anywhere in a text block. Use IS NULL to identify empty records.",
    playground: {
      challenge: "Find all employees who earn more than 85,000 and have a role that contains the word 'Engineer' (use AND with the LIKE keyword with '%Engineer%').",
      initialQuery: "SELECT * FROM employees WHERE salary > 80000;",
      validationQuery: "select * from employees where salary > 85000 and role like '%engineer%'",
      tables: {
        employees: [
          { id: 1, name: "Alice Vance", role: "Software Engineer", salary: 95000 },
          { id: 2, name: "Bob Miller", role: "Data Analyst", salary: 78000 },
          { id: 3, name: "Charlie Song", role: "DevOps Engineer", salary: 98000 },
          { id: 4, name: "Diana Prince", role: "Product Manager", salary: 110000 },
          { id: 5, name: "Evan Wright", role: "Designer", salary: 82000 }
        ]
      }
    }
  },
  {
    id: "order-limit",
    title: "4. ORDER BY & LIMIT (Sorting & Pagination)",
    category: "basics",
    difficulty: "easy",
    shortDescription: "Sort multi-column data layouts, manage sorting directions, and structure fast database pagination.",
    description: `
      <p>Relational theory states that rows in a table are stored in an unordered set. Without an explicit sort command, the database engine returns rows in whatever sequence it reads them from disk, which is unreliable.</p>
      
      <h4>The ORDER BY Clause:</h4>
      <p>Used to sort result sets in ascending (<code>ASC</code>, default) or descending (<code>DESC</code>) order based on one or more columns.</p>
      
      <div class="theory-deep-dive" style="background: rgba(0, 242, 254, 0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
        <h5 style="margin-top:0; color:var(--accent-primary);">🎓 Multi-Column Sorting:</h5>
        <p>You can sort by multiple columns. The engine first sorts by the first column, and then resolves duplicate values using the second column. For example:</p>
        <code style="display:block; margin: 8px 0; padding: 8px; background: rgba(0,0,0,0.3);">ORDER BY department_id ASC, salary DESC;</code>
        <p>This groups all employees in the same department together, and then sorts them by salary from highest to lowest within each department.</p>
      </div>

      <h4>The LIMIT Clause:</h4>
      <p>Restricts the total number of rows returned by the query. In many production systems (like PostgreSQL and MySQL), you can combine <code>LIMIT</code> with <code>OFFSET</code> to paginate results (e.g., <code>LIMIT 10 OFFSET 20</code> returns page 3 of the results).</p>
      <p><em>Note: Always use ORDER BY when using LIMIT. Otherwise, you'll retrieve a random subset of rows, which makes pagination inconsistent.</em></p>
    `,
    syntax: "SELECT columns FROM table ORDER BY col_1 DESC, col_2 ASC LIMIT number_of_rows;",
    cheatSheet: "ORDER BY DESC sorts largest-to-smallest. Combine with LIMIT to find extreme values (e.g., highest salary).",
    playground: {
      challenge: "Select the 'name' and 'salary' columns and retrieve the top 3 highest-earning employees in the company.",
      initialQuery: "SELECT name, salary FROM employees ORDER BY salary DESC;",
      validationQuery: "select name, salary from employees order by salary desc limit 3",
      tables: {
        employees: [
          { id: 1, name: "Alice Vance", role: "Software Engineer", salary: 95000 },
          { id: 2, name: "Bob Miller", role: "Data Analyst", salary: 78000 },
          { id: 3, name: "Charlie Song", role: "DevOps Engineer", salary: 98000 },
          { id: 4, name: "Diana Prince", role: "Product Manager", salary: 110000 },
          { id: 5, name: "Evan Wright", role: "Designer", salary: 82000 }
        ]
      }
    }
  },
  {
    id: "group-having",
    title: "5. GROUP BY & HAVING (Aggregations)",
    category: "advanced",
    difficulty: "medium",
    shortDescription: "Aggregate rows with functions like COUNT, SUM, AVG, and master the difference between WHERE and HAVING.",
    description: `
      <p>Aggregation is the process of grouping multiple rows into a single summary row based on a shared attribute. This is how databases compile metrics, financial averages, and analytics.</p>
      
      <h4>Core Aggregate Functions:</h4>
      <ul>
        <li><code>COUNT(column)</code>: Counts the number of values in that column (ignoring <code>NULL</code> values). <code>COUNT(*)</code> counts all rows, including those with null fields.</li>
        <li><code>AVG(column)</code>: Calculates the arithmetic mean.</li>
        <li><code>SUM(column)</code>: Returns the total sum of numerical columns.</li>
        <li><code>MAX(column)</code> / <code>MIN(column)</code>: Returns the highest and lowest values (works on numbers, text, and dates).</li>
      </ul>

      <div class="theory-deep-dive" style="background: rgba(0, 242, 254, 0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
        <h5 style="margin-top:0; color:var(--accent-primary);">⚠️ The Golden Rule of GROUP BY:</h5>
        <p>If a column is selected but is not inside an aggregate function (like <code>SUM</code> or <code>AVG</code>), it <strong>must</strong> be listed in the <code>GROUP BY</code> clause. For example, <code>SELECT department_id, name, AVG(salary) GROUP BY department_id</code> is invalid because the engine doesn't know which 'name' to show for each department group.</p>
      </div>

      <h4>WHERE vs. HAVING:</h4>
      <p>The query lifecycle separates raw row filtering from group filtering:</p>
      <ul>
        <li><strong><code>WHERE</code>:</strong> Filters raw individual rows <em>before</em> any grouping or calculations take place. It cannot refer to aggregate calculations (e.g., <code>WHERE AVG(salary) &gt; 50000</code> is an error).</li>
        <li><strong><code>HAVING</code>:</strong> Filters the aggregated groups <em>after</em> the <code>GROUP BY</code> step. Use it to filter groups based on aggregate values.</li>
      </ul>
    `,
    syntax: "SELECT group_col, AVG(num_col) FROM table GROUP BY group_col HAVING AVG(num_col) > threshold;",
    cheatSheet: "Use WHERE to filter rows before aggregation. Use HAVING to filter groups after aggregation.",
    playground: {
      challenge: "Calculate the average salary for each department group, but only show departments where the average salary is greater than 85,000.",
      initialQuery: "SELECT department_id, AVG(salary) FROM employees GROUP BY department_id;",
      validationQuery: "select department_id, avg(salary) from employees group by department_id having avg(salary) > 85000",
      tables: {
        employees: [
          { id: 1, name: "Alice Vance", department_id: 10, salary: 95000 },
          { id: 2, name: "Bob Miller", department_id: 20, salary: 78000 },
          { id: 3, name: "Charlie Song", department_id: 10, salary: 98000 },
          { id: 4, name: "Diana Prince", department_id: 30, salary: 110000 },
          { id: 5, name: "Evan Wright", department_id: 30, salary: 82000 }
        ]
      }
    }
  },
  {
    id: "joins",
    title: "6. SQL JOINS (Relational Connections)",
    category: "joins",
    difficulty: "medium",
    shortDescription: "Bridge related datasets using INNER, LEFT, and RIGHT joins, and understand relationship schemas.",
    description: `
      <p>In a normalized database, data is separated into multiple tables to prevent duplication. To query this data, you use the <strong><code>JOIN</code></strong> clause, which links tables based on related columns.</p>
      
      <h4>Primary vs. Foreign Keys:</h4>
      <p>An employee's <code>department_id</code> column is a <strong>Foreign Key (FK)</strong> that points to the <code>id</code> column in the <code>departments</code> table. Joins match rows by comparing these keys.</p>

      <div class="theory-deep-dive" style="background: rgba(0, 242, 254, 0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
        <h5 style="margin-top:0; color:var(--accent-primary);">🗺️ Understanding Join Types:</h5>
        <ul>
          <li><strong>INNER JOIN (Default):</strong> Returns rows only when there is a match in both tables. If an employee's department ID doesn't match any department in the list, that employee is excluded from the results.</li>
          <li><strong>LEFT JOIN (Left Outer Join):</strong> Returns <em>all</em> rows from the left table, along with matching rows from the right table. If a row in the left table has no match on the right, the right-side columns are filled with <code>NULL</code> values.</li>
          <li><strong>RIGHT JOIN (Right Outer Join):</strong> The reverse of a LEFT JOIN. Returns all rows from the right table, filling left-side columns with <code>NULL</code> when there's no match.</li>
        </ul>
      </div>

      <h4>Self Joins:</h4>
      <p>A Self Join is when a table is joined with itself. This is useful for querying hierarchical relationships within a single table, such as linking employees to their managers.</p>
    `,
    syntax: "SELECT a.col, b.col FROM table_a a INNER JOIN table_b b ON a.fk_col = b.pk_col;",
    cheatSheet: "Use table aliases (like 'e' for employees) to keep your joins clean and prevent ambiguous column name errors.",
    playground: {
      challenge: "Write an INNER JOIN to fetch the employee 'name', employee 'role', and their department 'dept_name' from the 'employees' and 'departments' tables.",
      initialQuery: "SELECT employees.name, departments.dept_name FROM employees INNER JOIN departments ON employees.department_id = departments.id;",
      validationQuery: "select employees.name, employees.role, departments.dept_name from employees inner join departments on employees.department_id = departments.id",
      tables: {
        employees: [
          { id: 1, name: "Alice Vance", role: "Software Engineer", department_id: 10 },
          { id: 2, name: "Bob Miller", role: "Data Analyst", department_id: 20 },
          { id: 3, name: "Diana Prince", role: "Product Manager", department_id: 30 }
        ],
        departments: [
          { id: 10, dept_name: "Engineering", manager: "Sarah Connor" },
          { id: 20, dept_name: "Analytics", manager: "Neo" },
          { id: 30, dept_name: "Product Management", manager: "Morpheus" }
        ]
      }
    }
  },
  {
    id: "subqueries",
    title: "7. Nested Subqueries",
    category: "advanced",
    difficulty: "hard",
    shortDescription: "Learn to write modular SQL by nesting queries inside outer queries.",
    description: `
      <p>A <strong>Subquery</strong> (also called a nested or inner query) is a SELECT query nested inside another SQL statement. This allows you to write dynamic queries where the filter criteria depends on a separate calculation.</p>
      
      <h4>Subquery Classifications:</h4>
      <ul>
        <li><strong>Scalar Subqueries:</strong> Returns exactly one row and one column (a single value). You can use these anywhere a constant value is allowed, such as in comparison operators.</li>
        <li><strong>Multi-Row Subqueries:</strong> Returns a column of values. Used with operators like <code>IN</code>, <code>ANY</code>, or <code>ALL</code>.</li>
        <li><strong>Correlated Subqueries:</strong> An advanced subquery that references a column from the outer query. The database engine must evaluate the subquery once for every row in the outer query, which can make it slower to run.</li>
      </ul>

      <div class="theory-deep-dive" style="background: rgba(0, 242, 254, 0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
        <h5 style="margin-top:0; color:var(--accent-primary);">🧠 Walkthrough: The Average Salary Query</h5>
        <p>If you want to find everyone earning more than average, you cannot write <code>WHERE salary &gt; AVG(salary)</code> because aggregate functions aren't allowed in WHERE clauses. Instead, you nest a subquery to calculate the average first:</p>
        <code style="display:block; margin: 8px 0; padding: 8px; background: rgba(0,0,0,0.3); font-size: 0.8rem; line-height: 1.3;">
          SELECT * FROM employees <br />
          WHERE salary > (<br />
          &nbsp;&nbsp;SELECT AVG(salary) FROM employees -- runs first!<br />
          );
        </code>
      </div>
    `,
    syntax: "SELECT * FROM outer_table WHERE col = (SELECT scalar_val FROM inner_table);",
    cheatSheet: "Wrap subqueries in parentheses. Use scalar subqueries for single values, and IN subqueries for lists of values.",
    playground: {
      challenge: "Find all employees in the 'employees' table who make more than the average salary of the entire company.",
      initialQuery: "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
      validationQuery: "select * from employees where salary > (select avg(salary) from employees)",
      tables: {
        employees: [
          { id: 1, name: "Alice Vance", role: "Software Engineer", salary: 95000 },
          { id: 2, name: "Bob Miller", role: "Data Analyst", salary: 78000 },
          { id: 3, name: "Charlie Song", role: "DevOps Engineer", salary: 98000 },
          { id: 4, name: "Diana Prince", role: "Product Manager", salary: 110000 },
          { id: 5, name: "Evan Wright", role: "Designer", salary: 82000 }
        ]
      }
    }
  },
  {
    id: "ddl-dml",
    title: "8. DDL vs DML (Database Taxonomy)",
    category: "manipulation",
    difficulty: "medium",
    shortDescription: "Learn to distinguish between schema-altering commands (DDL) and record manipulation operations (DML).",
    description: `
      <p>SQL statements are categorized into distinct sub-languages based on their functional role inside the database. The two main divisions are <strong>DDL</strong> and <strong>DML</strong>.</p>
      
      <h4>1. DDL (Data Definition Language)</h4>
      <p>DDL statements are used to define, alter, and manage the structure or schema of database tables, relationships, and indexes. These operations are structural and permanent.</p>
      <ul>
        <li><code>CREATE TABLE</code>: Defines a new table schema.</li>
        <li><code>ALTER TABLE</code>: Adds, drops, or modifies columns in an existing table.</li>
        <li><code>DROP TABLE</code>: Permanently deletes a table and all its data.</li>
      </ul>

      <h4>2. DML (Data Manipulation Language)</h4>
      <p>DML statements are used to manage and manipulate the records stored within the tables. These are query-level operations.</p>
      <ul>
        <li><code>INSERT INTO</code>: Adds new rows to a table.</li>
        <li><code>UPDATE</code>: Modifies existing column values in a table.</li>
        <li><code>DELETE FROM</code>: Removes rows from a table.</li>
      </ul>

      <div class="theory-deep-dive" style="background: rgba(239, 68, 68, 0.03); border: 1px solid rgba(239, 68, 68, 0.2); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
        <h5 style="margin-top:0; color:#f87171;">⚠️ Danger: The Unbounded UPDATE & DELETE</h5>
        <p>If you run <code>UPDATE employees SET salary = 100000;</code> without a <code>WHERE</code> clause, the database will apply that change to <strong>every single employee</strong> in the database. Always double-check your update filters before executing them.</p>
      </div>
    `,
    syntax: "INSERT INTO table (col1, col2) VALUES (val1, val2);\nUPDATE table SET col = val WHERE condition;",
    cheatSheet: "DDL changes the container (schema structure). DML changes the content (records inside).",
    playground: {
      challenge: "Add a new record to the 'employees' table. Insert a new QA Specialist named 'John Doe' with a salary of 72000 (set ID to 6).",
      initialQuery: "INSERT INTO employees (id, name, role, salary) VALUES (6, 'John Doe', 'QA Specialist', 72000);",
      validationQuery: "insert into employees (id, name, role, salary) values (6, 'john doe', 'qa specialist', 72000)",
      tables: {
        employees: [
          { id: 1, name: "Alice Vance", role: "Software Engineer", salary: 95000 },
          { id: 2, name: "Bob Miller", role: "Data Analyst", salary: 78000 }
        ]
      }
    }
  },
  {
    id: "constraints",
    title: "9. Database Constraints & Data Safety",
    category: "manipulation",
    difficulty: "medium",
    shortDescription: "Enforce business rules and data safety using NOT NULL, UNIQUE, Primary Key, and Foreign Key checks.",
    description: `
      <p>Constraints are rules applied to columns in a table. They limit the type and value of data that can be inserted, ensuring accuracy and reliability (referred to as **Data Integrity**).</p>
      
      <h4>Core Database Constraints:</h4>
      <ul>
        <li><strong><code>NOT NULL</code>:</strong> Prevents a column from storing a <code>NULL</code> value. Good for mandatory fields like usernames or emails.</li>
        <li><strong><code>UNIQUE</code>:</strong> Ensures that all values in a column are distinct (e.g., preventing two users from registering with the same email).</li>
        <li><strong><code>PRIMARY KEY</code>:</strong> A combination of <code>NOT NULL</code> and <code>UNIQUE</code>. Uniquely identifies each record.</li>
        <li><strong><code>FOREIGN KEY</code>:</strong> Links tables together, ensuring that values in a column must exist in a referenced table. This prevents 'orphan records' (like an employee assigned to a department ID that doesn't exist).</li>
        <li><strong><code>CHECK</code>:</strong> Ensures that all values in a column satisfy a specific boolean expression (e.g., <code>CHECK (salary &gt;= 0)</code>).</li>
      </ul>

      <div class="theory-deep-dive" style="background: rgba(0, 242, 254, 0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
        <h5 style="margin-top:0; color:var(--accent-primary);">⛓️ Referential Integrity Actions:</h5>
        <p>What happens when a department is deleted while it still has employees? You can define foreign key actions to handle this automatically:</p>
        <ul>
          <li><code>ON DELETE CASCADE</code>: Deletes the child records (employees) automatically if the parent record (department) is deleted.</li>
          <li><code>ON DELETE SET NULL</code>: Sets the child foreign key values to <code>NULL</code> when the parent record is deleted.</li>
        </ul>
      </div>
    `,
    syntax: "CREATE TABLE students (\n  id INT PRIMARY KEY,\n  email VARCHAR(100) UNIQUE NOT NULL,\n  age INT CHECK (age >= 18)\n);",
    cheatSheet: "Use constraints to protect data quality at the database level, preventing invalid or garbage data from being saved.",
    playground: {
      challenge: "Query the constraint validator logs table to find all warning messages where the severity level is 'HIGH'.",
      initialQuery: "SELECT * FROM constraints_log WHERE severity = 'HIGH';",
      validationQuery: "select * from constraints_log where severity = 'high'",
      tables: {
        constraints_log: [
          { id: 1, constraint_name: "pk_users", table: "users", severity: "HIGH", message: "Attempted duplicate key insertion" },
          { id: 2, constraint_name: "chk_salary", table: "employees", severity: "MEDIUM", message: "Negative salary input blocked" },
          { id: 3, constraint_name: "nn_email", table: "users", severity: "HIGH", message: "Null value insertion blocked on non-nullable field" }
        ]
      }
    }
  },
  {
    id: "views-ctes",
    title: "10. Common Table Expressions (CTEs) & Views",
    category: "advanced",
    difficulty: "hard",
    shortDescription: "Simplify complex and nested SQL queries using Common Table Expressions and virtual views.",
    description: `
      <p>As databases grow and queries become more complex, statements can become difficult to read. SQL provides two features to help organize and simplify your queries: <strong>Views</strong> and <strong>CTEs</strong>.</p>
      
      <h4>1. Common Table Expressions (CTEs)</h4>
      <p>A CTE is a temporary result set defined using the <code>WITH</code> keyword. It exists only for the duration of the query, acting like a temporary table that makes complex queries much easier to read and maintain compared to nested subqueries.</p>
      
      <div style="font-family: var(--font-mono); font-size: 0.85rem; padding: 12px; background: rgba(0,0,0,0.25); border-radius: 4px; margin: 12px 0;">
        <span style="color:#60a5fa;">WITH</span> high_earners <span style="color:#60a5fa;">AS</span> (<br />
        &nbsp;&nbsp;<span style="color:#60a5fa;">SELECT</span> * <span style="color:#60a5fa;">FROM</span> employees <span style="color:#60a5fa;">WHERE</span> salary &gt; 90000<br />
        )<br />
        <span style="color:#60a5fa;">SELECT</span> * <span style="color:#60a5fa;">FROM</span> high_earners;
      </div>

      <h4>2. Views (Virtual Tables)</h4>
      <p>A View is a virtual table defined by an SQL query. It does not store physical data itself. Instead, it acts as a saved query definition that runs dynamically whenever you query the view.</p>

      <div class="theory-deep-dive" style="background: rgba(0, 242, 254, 0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-sm); margin: 16px 0;">
        <h5 style="margin-top:0; color:var(--accent-primary);">💎 Key Benefits:</h5>
        <ul>
          <li><strong>Readability:</strong> CTEs break down long queries into logical steps.</li>
          <li><strong>Reusability:</strong> Views let you save complex join queries so you can easily reference them again later without rewriting the join logic.</li>
          <li><strong>Security:</strong> You can grant users access to a view that hides sensitive columns (like salaries) without giving them direct access to the underlying table.</li>
        </ul>
      </div>
    `,
    syntax: "WITH cte_name AS (\n  SELECT columns FROM table WHERE condition\n)\nSELECT * FROM cte_name;",
    cheatSheet: "Use CTEs (WITH clause) to make complex queries easier to read. Use Views to save query definitions for reuse.",
    playground: {
      challenge: "Create a CTE named 'high_earners' to filter employees earning more than 90,000, then SELECT all records from this CTE.",
      initialQuery: "WITH high_earners AS (\n  SELECT * FROM employees WHERE salary > 90000\n)\nSELECT * FROM high_earners;",
      validationQuery: "with high_earners as (select * from employees where salary > 90000) select * from high_earners",
      tables: {
        employees: [
          { id: 1, name: "Alice Vance", role: "Software Engineer", salary: 95000 },
          { id: 2, name: "Bob Miller", role: "Data Analyst", salary: 78000 },
          { id: 3, name: "Charlie Song", role: "DevOps Engineer", salary: 98000 }
        ]
      }
    }
  }
];
