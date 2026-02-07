import React, { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code2, ArrowRight } from "lucide-react";

function JavaLearn() {
  const navigate = useNavigate();

  // ✅ Auto scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(
    () => [
      { id: "intro", title: "What is Java?" },
      { id: "install", title: "Install Java (JDK)" },
      { id: "syntax", title: "Java Program Structure" },
      { id: "variables", title: "Variables" },
      { id: "datatypes", title: "Data Types" },
      { id: "operators", title: "Operators" },
      { id: "conditions", title: "If / Else" },
      { id: "switch", title: "Switch Case" },
      { id: "loops", title: "Loops (for / while / do-while)" },
      { id: "arrays", title: "Arrays" },
      { id: "strings", title: "String Basics" },
      { id: "methods", title: "Methods (Functions)" },
      { id: "oops", title: "OOP Basics" },
      { id: "classobj", title: "Class & Object" },
      { id: "inheritance", title: "Inheritance" },
      { id: "polymorphism", title: "Polymorphism" },
      { id: "abstraction", title: "Abstract Class & Interface" },
      { id: "encapsulation", title: "Encapsulation" },
      { id: "exception", title: "Exception Handling" },
      { id: "collections", title: "Collections (ArrayList, HashMap)" },
      { id: "best", title: "Best Practices" },
    ],
    []
  );

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const CodeBlock = ({ children }) => (
    <pre className="bg-slate-900 text-slate-50 p-4 rounded-xl text-sm overflow-x-auto border border-slate-800">
      <code>{children}</code>
    </pre>
  );

  const Section = ({ id, title, children }) => (
    <section
      id={id}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm scroll-mt-24"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center">
          <Code2 className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ✅ HEADER */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Learning
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Java Tutorial (Full Basics)
          </h1>

          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            Java is one of the most popular programming languages. It is used in
            Android apps, backend development, enterprise software, and DSA.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/java")}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              Start Java Quiz <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo("syntax")}
              className="px-5 py-3 rounded-xl border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
            >
              Jump to Program Structure
            </button>
          </div>
        </div>

        {/* ✅ MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* ✅ LEFT TOC */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-700" />
                Table of Contents
              </h3>

              <div className="max-h-[75vh] overflow-auto pr-2 space-y-2">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition text-sm"
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate("/java")}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-95 transition"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </aside>

          {/* ✅ RIGHT CONTENT */}
          <main className="space-y-6">
            <Section id="intro" title="What is Java?">
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Java is an Object-Oriented Programming language</li>
                <li>Runs on JVM (Java Virtual Machine)</li>
                <li>Write once, run anywhere (platform independent)</li>
                <li>Used in backend, Android, and enterprise apps</li>
              </ul>
            </Section>

            <Section id="install" title="Install Java (JDK)">
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Install JDK (Java Development Kit)</li>
                <li>Set JAVA_HOME & add Java to PATH</li>
                <li>Check installation</li>
              </ul>
              <CodeBlock>{`java -version
javac -version`}</CodeBlock>
            </Section>

            <Section id="syntax" title="Java Program Structure">
              <p className="text-slate-700 mb-4">
                Every Java program starts from <b>main()</b> method.
              </p>
              <CodeBlock>{`public class Main {
  public static void main(String[] args) {
    System.out.println("Hello Java");
  }
}`}</CodeBlock>
            </Section>

            <Section id="variables" title="Variables">
              <CodeBlock>{`int age = 20;
String name = "Feedi";
boolean isStudent = true;

System.out.println(name + " " + age);`}</CodeBlock>
            </Section>

            <Section id="datatypes" title="Data Types">
              <CodeBlock>{`int a = 10;
double d = 5.5;
char ch = 'A';
boolean ok = true;
String text = "Hello";`}</CodeBlock>
            </Section>

            <Section id="operators" title="Operators">
              <CodeBlock>{`int a = 10;
int b = 3;

System.out.println(a + b);
System.out.println(a - b);
System.out.println(a * b);
System.out.println(a / b);
System.out.println(a % b);`}</CodeBlock>
            </Section>

            <Section id="conditions" title="If / Else">
              <CodeBlock>{`int marks = 75;

if (marks >= 90) {
  System.out.println("A Grade");
} else if (marks >= 60) {
  System.out.println("B Grade");
} else {
  System.out.println("Fail");
}`}</CodeBlock>
            </Section>

            <Section id="switch" title="Switch Case">
              <CodeBlock>{`int day = 2;

switch(day) {
  case 1: System.out.println("Monday"); break;
  case 2: System.out.println("Tuesday"); break;
  default: System.out.println("Other day");
}`}</CodeBlock>
            </Section>

            <Section id="loops" title="Loops (for / while / do-while)">
              <CodeBlock>{`// for loop
for(int i = 1; i <= 5; i++){
  System.out.println(i);
}

// while loop
int x = 1;
while(x <= 5){
  System.out.println(x);
  x++;
}

// do-while loop
int y = 1;
do {
  System.out.println(y);
  y++;
} while(y <= 5);`}</CodeBlock>
            </Section>

            <Section id="arrays" title="Arrays">
              <CodeBlock>{`int[] nums = {10, 20, 30};

System.out.println(nums[0]); // 10
System.out.println(nums.length);`}</CodeBlock>
            </Section>

            <Section id="strings" title="String Basics">
              <CodeBlock>{`String text = "Hello World";

System.out.println(text.length());
System.out.println(text.toUpperCase());
System.out.println(text.replace("World", "Java"));`}</CodeBlock>
            </Section>

            <Section id="methods" title="Methods (Functions)">
              <CodeBlock>{`public class Main {
  static int add(int a, int b){
    return a + b;
  }

  public static void main(String[] args){
    System.out.println(add(5, 10));
  }
}`}</CodeBlock>
            </Section>

            <Section id="oops" title="OOP Basics">
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Class = blueprint</li>
                <li>Object = real instance</li>
                <li>4 pillars: Encapsulation, Inheritance, Polymorphism, Abstraction</li>
              </ul>
            </Section>

            <Section id="classobj" title="Class & Object">
              <CodeBlock>{`class Student {
  String name;
  int age;

  void show(){
    System.out.println(name + " " + age);
  }
}

public class Main {
  public static void main(String[] args) {
    Student s = new Student();
    s.name = "Feedi";
    s.age = 20;
    s.show();
  }
}`}</CodeBlock>
            </Section>

            <Section id="inheritance" title="Inheritance">
              <CodeBlock>{`class Animal {
  void sound(){
    System.out.println("Animal sound");
  }
}

class Dog extends Animal {
  void bark(){
    System.out.println("Dog barks");
  }
}`}</CodeBlock>
            </Section>

            <Section id="polymorphism" title="Polymorphism">
              <CodeBlock>{`class A {
  void show(){ System.out.println("A"); }
}

class B extends A {
  void show(){ System.out.println("B"); }
}

public class Main {
  public static void main(String[] args){
    A obj = new B();
    obj.show(); // B
  }
}`}</CodeBlock>
            </Section>

            <Section id="abstraction" title="Abstract Class & Interface">
              <CodeBlock>{`abstract class Shape {
  abstract void draw();
}

class Circle extends Shape {
  void draw(){
    System.out.println("Circle draw");
  }
}

// interface
interface Animal {
  void sound();
}

class Cat implements Animal {
  public void sound(){
    System.out.println("Meow");
  }
}`}</CodeBlock>
            </Section>

            <Section id="encapsulation" title="Encapsulation">
              <CodeBlock>{`class Account {
  private int balance = 1000;

  public int getBalance(){
    return balance;
  }

  public void setBalance(int b){
    balance = b;
  }
}`}</CodeBlock>
            </Section>

            <Section id="exception" title="Exception Handling">
              <CodeBlock>{`try {
  int x = 10 / 0;
} catch(Exception e) {
  System.out.println("Error: " + e.getMessage());
}`}</CodeBlock>
            </Section>

            <Section id="collections" title="Collections (ArrayList, HashMap)">
              <CodeBlock>{`import java.util.*;

public class Main {
  public static void main(String[] args) {

    ArrayList<String> list = new ArrayList<>();
    list.add("A");
    list.add("B");

    HashMap<String, Integer> map = new HashMap<>();
    map.put("age", 20);

    System.out.println(list);
    System.out.println(map.get("age"));
  }
}`}</CodeBlock>
            </Section>

            <Section id="best" title="Best Practices">
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Use meaningful class + method names</li>
                <li>Keep code in packages</li>
                <li>Follow OOP principles</li>
                <li>Use try-catch for risky code</li>
                <li>Prefer ArrayList/HashMap for real projects</li>
              </ul>
            </Section>

            {/* FINAL CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Ready to test yourself?
              </h3>
              <p className="text-slate-600 mb-6">
                Start the Java quiz and update your dashboard progress.
              </p>

              <button
                onClick={() => navigate("/java")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition"
              >
                Start Java Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default JavaLearn;
