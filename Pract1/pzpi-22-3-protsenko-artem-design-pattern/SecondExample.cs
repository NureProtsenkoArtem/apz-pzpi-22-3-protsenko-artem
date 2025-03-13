using System;
using System.Collections.Generic;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

// Команди
public record CreateOrderCommand(string CustomerName, string Product) : IRequest<Guid>;

// Запити
public record GetOrdersQuery() : IRequest<List<Order>>;

//Об'єкт замовлення 
public class Order {
    public Guid Id { get; init; }
    public string CustomerName { get; init; }
    public string Product { get; init; }

    public Order(Guid id, string customerName, string product) {
        Id = id;
        CustomerName = customerName;
        Product = product;
    }
}

// Обробник команди CreateOrderCommand
public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Guid> {
    private readonly OrderRepository _repository;

    public CreateOrderHandler(OrderRepository repository) {
        _repository = repository;
    }

    public Task<Guid> Handle(CreateOrderCommand request, CancellationToken cancellationToken) {
        var order = new Order(Guid.NewGuid(), request.CustomerName, request.Product);
        _repository.AddOrder(order);
        return Task.FromResult(order.Id);
    }
}

// Обробник запиту GetOrdersQuery
public class GetOrdersHandler : IRequestHandler<GetOrdersQuery, List<Order>> {
    private readonly OrderRepository _repository;

    public GetOrdersHandler(OrderRepository repository) {
        _repository = repository;
    }

    public Task<List<Order>> Handle(GetOrdersQuery request, CancellationToken cancellationToken) {
        return Task.FromResult(_repository.GetOrders());
    }
}

// Репозиторій для зберігання замовлень 
public class OrderRepository {
    private readonly List<Order> _orders = new();

    public void AddOrder(Order order) {
        _orders.Add(order);
    }

    public List<Order> GetOrders() {
        return _orders;
    }
}

// Головний клас програми
class Program {
    static async Task Main() {
        var services = new ServiceCollection();
        services.AddSingleton<OrderRepository>();
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
        
        var provider = services.BuildServiceProvider();
        var mediator = provider.GetRequiredService<IMediator>();
        
        var orderId = await mediator.Send(new CreateOrderCommand("Alice", "Laptop"));
        Console.WriteLine($"Order Created with ID: {orderId}");
        
        var orders = await mediator.Send(new GetOrdersQuery());
        foreach (var order in orders) {
            Console.WriteLine($"Order {order.Id}: {order.CustomerName} ordered {order.Product}");
        }
    }
}
