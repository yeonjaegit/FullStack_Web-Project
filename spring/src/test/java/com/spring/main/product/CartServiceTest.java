package com.spring.main.product;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

import com.spring.main.member.Member;

/**
 * Unit tests for {@link CartService}.
 *
 * <p>The service originally relied on {@link List#contains(Object)} to prevent
 * inserting duplicate products into a cart. Because {@link Product} uses
 * Lombok's {@code @Data}, the generated {@code equals} method compares every
 * field, meaning two products with the same id but different other fields were
 * treated as distinct and could be added multiple times. The test below ensures
 * that the revised logic compares products by id and avoids duplicates.</p>
 */
class CartServiceTest {

    @Test
    void insertCartDoesNotDuplicateProducts() throws Exception {
        // Existing cart with one product
        Cart existingCart = new Cart();
        Member member = new Member();
        member.setId(1);
        existingCart.setMember(member);

        Product existingProduct = new Product();
        existingProduct.setId(1);
        existingProduct.setProductName("Coffee");

        List<Product> products = new ArrayList<>();
        products.add(existingProduct);
        existingCart.setProductList(products);

        // Minimal CartRepo implemented via dynamic proxy for the test
        InvocationHandler handler = new InvocationHandler() {
            private Cart stored = existingCart;

            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                switch (method.getName()) {
                case "findByMemberId":
                    return stored;
                case "save":
                    stored = (Cart) args[0];
                    return stored;
                default:
                    throw new UnsupportedOperationException("Unsupported method: " + method.getName());
                }
            }
        };

        CartRepo repo = (CartRepo) Proxy.newProxyInstance(
                CartRepo.class.getClassLoader(), new Class[] { CartRepo.class }, handler);

        CartService service = new CartService();
        Field repoField = CartService.class.getDeclaredField("cartRepo");
        repoField.setAccessible(true);
        repoField.set(service, repo);

        Map<String, Integer> data = new HashMap<>();
        data.put("memberId", 1);
        data.put("productId", 1);

        service.insertCart(data);

        assertEquals(1, existingCart.getProductList().size(),
                "Product with same id should not be added twice");
    }
}

