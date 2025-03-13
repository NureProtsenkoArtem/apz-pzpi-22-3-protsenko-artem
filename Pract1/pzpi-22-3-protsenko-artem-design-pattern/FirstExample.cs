using System;
using System.Collections.Generic;

namespace NureTest;

interface IChatMediator {
   void SendMessage(string message, User user);
   void AddUser(User user);
}

class ChatMediator : IChatMediator {
   private List<User> users = new List<User>();

   public void AddUser(User user) {
      users.Add(user);
   }

   public void SendMessage(string message, User user) {
      foreach (var u in users) {
         if (u != user) {
            u.Receive(message);
         }
      }
   }
}

class User {
   private string _name;
   private IChatMediator _mediator;

   public User(string name, IChatMediator mediator) {
      _name = name;
      _mediator = mediator;
   }

   public void Send(string message) {
      Console.WriteLine(_name + " sends: " + message);
      _mediator.SendMessage(message, this);
   }

   public void Receive(string message) {
      Console.WriteLine(_name + " received: " + message);
   }
}

class Program {
   static void Main() {
      IChatMediator chat = new ChatMediator();
      User user1 = new User("Alice", chat);
      User user2 = new User("Bob", chat);
      chat.AddUser(user1);
      chat.AddUser(user2);

      user1.Send("Hello, Bob!");
      user2.Send("Hi, Alice!");
   }
}