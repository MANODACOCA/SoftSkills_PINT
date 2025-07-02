
class User {
  User({required this.id});
  
  final String id;

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id_utilizador'],
    );
  }
}
