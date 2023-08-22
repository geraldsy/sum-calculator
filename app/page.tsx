"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  collection,
  addDoc,
  getDoc,
  setDoc,
  doc,
  QuerySnapshot,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
type ValueObject = {
  first: number;
  second: number;
  third: number;
};
export default function Home() {
  const [values, setValues] = useState({
    first: 0,
    second: 0,
    third: 0,
  });

  const [total, setTotal] = useState(Number);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    if (!values.first || !values.second || !values.third) {
      alert("All values must be provided and should be valid numbers.");
      return;
    }

    try {
      const docRef = doc(db, "values", "currentValues");

      await setDoc(
        docRef,
        {
          first: values.first,
          second: values.second,
          third: values.third,
        },
        { merge: true }
      );
      const sum = values.first + values.second + values.third;
      setTotal(sum);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  useEffect(() => {
    const docRef = doc(db, "values", "currentValues");

    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        if (data) {
          setValues({
            first: data.first,
            second: data.second,
            third: data.third,
          });
          console.log("loaded values");
          setTotal(data.first + data.second + data.third);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-5 p-24">
      <h1 className="text-4xl font-bold">Three-Value Calculator</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Tabs defaultValue="First" className="w-[400px]  ">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="First">First</TabsTrigger>
            <TabsTrigger value="Second">Second</TabsTrigger>
            <TabsTrigger value="Third">Third</TabsTrigger>
          </TabsList>
          <TabsContent value="First">
            <Input
              onChange={(e) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  first: parseInt(e.target.value),
                }))
              }
              value={values.first}
              type="number"
              placeholder="First Value"
            />
          </TabsContent>
          <TabsContent value="Second">
            <Input
              onChange={(e) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  second: parseInt(e.target.value),
                }))
              }
              value={values.second}
              type="number"
              placeholder="Second Value"
            />
          </TabsContent>
          <TabsContent value="Third">
            <Input
              onChange={(e) =>
                setValues((prevValues) => ({
                  ...prevValues,
                  third: parseInt(e.target.value),
                }))
              }
              value={values.third}
              type="number"
              placeholder="Third Value"
            />
          </TabsContent>
        </Tabs>
        <h2 className="text-xl font-bold">Total:{total} </h2>
        <Button type="submit">Calculate</Button>
      </form>
    </main>
  );
}
