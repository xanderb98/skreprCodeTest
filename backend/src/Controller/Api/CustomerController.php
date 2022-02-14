<?php

namespace App\Controller\Api;

use App\Entity\Customer;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CustomerController extends AbstractController
{
    #[Route('/api/customer', name: 'postCustomer', methods: ['POST'])]
    public function addCustomer(Request $request, ManagerRegistry $doctrine): Response
    {
        if (!$request->request->has('name')) {
            return $this->json(['message' => 'The request could not be understood, missing name field'], 400);
        }
        $entityManager = $doctrine->getManager();

        $customer = new Customer();
        $customer->setName($request->request->get('name'));
        $customer->setPhoneNumber($request->request->get('phoneNumber'));
        $customer->setDescription($request->request->get('description'));

        $entityManager->persist($customer);
        $entityManager->flush();

        return $this->json([
            'message' => 'Succesfully added a customer',
            'entity' => $customer->toArrayForApi(),
        ]);
    }

    #[Route('/api/customers/all', name: 'getAllCustomers', methods: ['GET'])]
    public function getCustomers(ManagerRegistry $doctrine): Response
    {
        $repository = $doctrine->getRepository(Customer::class);
        $customers = $repository->findAll();

        $output = [];

        foreach ($customers as $customer) {
            $output[] = $customer->toArrayForApi();
        }

        return $this->json($output);
    }

    #[Route('/api/customers/{id}', name: 'getCustomer', methods: ['GET'])]
    public function getCustomer(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $customer = $entityManager->getRepository(Customer::class)->find($id);

        if (!$customer) {
            return $this->json(['message' => 'No customer found for id ' . $id], 404);
        }

        return $this->json($customer->toArrayForApi());
    }
}
