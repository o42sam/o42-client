<script lang="ts">
    import StylizedName from "$lib/components/StylizedName.svelte";
    import { db } from '../../firebase';
    import { doc, setDoc } from 'firebase/firestore';

    let email: string = '';
    let submitting: boolean = false;
  
    function isValidEmail(email: string): boolean {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    async function submitEmail(): Promise<void> {
      if (submitting) return;
      submitting = true;
  
      const trimmedEmail = email.trim();
      if (!isValidEmail(trimmedEmail)) {
        alert('Please enter a valid email address.');
        submitting = false;
        return;
      }
  
      const normalizedEmail = trimmedEmail.toLowerCase();
      try {
        await setDoc(doc(db, 'emails', normalizedEmail), {
          email: normalizedEmail,
          timestamp: new Date()
        });
        alert('Email submitted successfully!');
        email = '';
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'permission-denied') {
          alert('This email is already subscribed.');
        } else {
          console.error('Error adding email: ', error);
          alert('There was an error submitting your email.');
        }
      } finally {
        submitting = false;
      }
    }
</script>

<svelte:head>
    <title>Earn on o42</title>
</svelte:head>
  
  <main class="w-full flex flex-col items-center justify-center mt-20">
    <div class="w-full">
            <!-- Hero Section -->
        <div class="bg-white py-16">
            <div class="container mx-auto px-4 w-2/3">
                <h1 class="text-4xl font-bold text-black mb-4">
                    Becoming an <StylizedName /> Inspection and Fulfilment Agent
                </h1>
                <p class="text-xl text-gray-700 mb-8">
                    Earn while ensuring the integrity of our network
                </p>
                <p class="text-gray-600">
                    <StylizedName /> connects buyers and sellers through a trusted network of agents. As an agent, you’ll inspect and fulfill orders, interact with customers, and ensure quality and delivery—earning commissions along the way.
                </p>
            </div>
        </div>
        
        <!-- Section 1: Role of an Agent (Text Left, Image Right) -->
        <div class="py-16 bg-gray-100">
            <div class="container mx-auto px-4 flex flex-col md:flex-row items-center w-2/3">
                <div class="md:w-1/2 mb-8 md:mb-0 px-10">
                    <h2 class="text-2xl font-semibold text-orange-600 mb-4">
                    Your Role as an Agent
                    </h2>
                    <p class="text-gray-600">
                    As an <StylizedName /> agent, you’ll inspect items to ensure they meet quality standards, facilitate delivery, and provide a personal touch by interacting directly with customers. You’re the key to making every transaction smooth and reliable.
                    </p>
                </div>
                <div class="md:w-1/2">
                    <img
                    src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN"
                    alt="Agent at work"
                    class="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
        
        <!-- Section 2: Benefits of Being an Agent (Image Left, Text Right) -->
        <div class="py-16 bg-gray-100">
            <div class="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center w-2/3">
                <div class="md:w-1/2 mb-8 md:mb-0 px-10">
                    <h2 class="text-2xl font-semibold text-orange-600 mb-4">
                    Benefits of Being an Agent
                    </h2>
                    <p class="text-gray-600">
                    Earn commissions for every order you fulfill, plus enjoy periodic creator payouts based on the revenue you help generate. Being an <StylizedName /> agent offers financial rewards and the chance to be part of a thriving community.
                    </p>
                </div>
                <div class="md:w-1/2">
                    <img
                    src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN"
                    alt="Earnings and benefits"
                    class="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
        
        <!-- Section 3: Verification Process (Text Left, Image Right) -->
        <div class="py-16 bg-gray-100">
            <div class="container mx-auto px-4 flex flex-col md:flex-row items-center  w-2/3">
                <div class="md:w-1/2 mb-8 md:mb-0 px-10">
                    <h2 class="text-2xl font-semibold text-orange-600 mb-4">
                    Rigorous Verification Process
                    </h2>
                    <p class="text-gray-600">
                    Safety and reliability are paramount at <StylizedName />. Agents undergo strict verification, including personal ID checks and proof of address, ensuring our customers can trust the network—and you can take pride in upholding its integrity.
                    </p>
                </div>
                <div class="md:w-1/2">
                    <img
                    src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN"
                    alt="Verification process"
                    class="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
        
        <!-- Section 4: How to Become an Agent (Image Left, Text Right) -->
        <div class="py-16 bg-gray-100">
            <div class="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center w-2/3">
                <div class="md:w-1/2 mb-8 md:mb-0 px-10">
                    <h2 class="text-2xl font-semibold text-orange-600 mb-4">
                    How to Become an Agent
                    </h2>
                    <p class="text-gray-600">
                    Getting started is simple: apply, complete the verification process, and begin accepting assignments. We’ll equip you with the tools and support you need to succeed as an <StylizedName /> agent. We aren't taking applications at the moment but we will in the future and you can join our waitlist to be one of the first to be considered.
                    </p>
                </div>
                <div class="md:w-1/2">
                    <img
                    src="https://lh3.googleusercontent.com/d/1ujTji0K9ZN8Vm1Fzb37tMb4Pvd4SeUlN"
                    alt="Steps to join"
                    class="w-full h-auto rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>
        
        <!-- CTA Section -->
        <div class="py-16 bg-orange-600 text-white">
            <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold mb-4">Ready to Join?</h2>
            <p class="mb-8">
                Sign up for our waitlist today to get the chance to start earning while making a difference.
            </p>
            <form
            on:submit|preventDefault={submitEmail}
            class="flex flex-col md:flex-row justify-center items-center">
                <input
                type="email"
                placeholder="Enter your email"
                bind:value={email}
                class="input px-4 py-2 rounded-lg mb-4 md:mb-0 md:mr-4 w-full md:w-auto"
                />
                <button
                type="submit"
                class="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
                >
                Join Waitlist
                </button>
            </form>
            </div>
        </div>
    </div>
</main>